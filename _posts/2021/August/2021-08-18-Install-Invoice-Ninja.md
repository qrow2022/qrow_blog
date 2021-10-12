---
title: Install Invoice Ninja - Ubuntu 20.04

categories:
    - Linux
---


I was turned on to InvoiceNinja a while ago, and I must say that in my extremely limited use, I like it. Two issues that I have is the current lack in installation documentation for the self-hosted version (particularly around the docker container, I don't have time to figure that out) and the current lack of the proposals section in v5. 

Hopefully both will be fixed at some point soon<sup>(TM)</sup>.

In any case, here is my documentation to install the current version of InvoiceNinja. At the point of writing, its version v5.2.19. I'm using Ubuntu 20.04m with Nginx.

## Installation

Go ahead and pre-install these dependencies:

```
sudo apt install php7.4 php7.4-{fpm,bcmath,ctype,fileinfo,json,mbstring,pdo,tokenizer,xml,curl,zip,gmp,gd,mysqli} mariadb-server mariadb-client curl git nginx -y
```
I know some of the php packages have changed into a common binary, but lets be specific.


Lets start mariadb and enable autostart:

```
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

Now lets secure config mariadb:

```
sudo mysql_secure_installation
```
If this is a new install (or a purged install), there is no default password.
Answer the questions as you wish, but I recommend setting a root password, disabling remote root access, dropping the test tables, and removing anonymous users.
Reload the privileges when you are done.


Now lets create the InvoiceNinja database and user the app will use for access. Please user better passwords and usernames than these examples.

```
sudo mysql -r root -p
```
Enter the new root password you just set above.

```
MariaDB .. > create database ninjadb;
MariaDB .. > create user 'ninja'@'localhost' identified by 'ninjapass';
MariaDB .. > grant all privileges on ninjadb.* to 'ninja'@'localhost';
MariaDB .. > flush privileges;
MariaDB .. > exit
```

Now, lets setup an SSL cert. I'm not going to go over letsencrypt or any other cert system. This creates a self-signed cert that is just fine for testing, but not for internet usage. This key will be good for 365 days.

```
sudo mkdir -p /etc/nginx/certs
sudo openssl req -new -x509 -days 365 -nodes -out /etc/nginx/cert/ninja.crt -keyout /etc/nginx/cert/ninja.key
```

Now let's remove the default page from nginx.

```
sudo rm /etc/nginx/sites-enabled/default
```

And create our own configuration.

```
sudo nano /etc/nginx/conf.d/invoiceninja.conf
```

Now, the config I'm about to present is not the most secure. It will get you going with only minor tweaks based on your setup. Once going, you should secure your site.

```
server {
# NOTE That the 'default_server' option is only necessary if this is your primary domain application.
# If you run multiple subdomains from the same host already, remove the 'default_server' option.
   listen       443 ssl http2 default_server;
   listen       [::]:443 ssl http2 default_server;
   server_name  invoice.your-domain-here.com;
   client_max_body_size 20M;

 # Here, enter the path to your invoiceninja directory, in the public dir.  VERY IMPORTANT
 # DO NOT point the root directly at your invoiceninja directory, it MUST point at the public folder
 # This is for security reasons.
   root         /usr/share/nginx/invoiceninja/public;

   gzip on;
   gzip_types application/javascript application/x-javascript text/javascript text/plain application/xml application/json;
   gzip_proxied    no-cache no-store private expired auth;
   gzip_min_length 1000;

   index index.php index.html index.htm;

 # Enter the path to your ssl certificate file, and certificate private key file
   ssl_certificate "/etc/nginx/cert/ninja.crt";
   ssl_certificate_key "/etc/nginx/cert/ninja.key";

   ssl_session_cache shared:SSL:1m;
   ssl_session_timeout  10m;
   ssl_ciphers 'AES128+EECDH:AES128+EDH:!aNULL';
   ssl_prefer_server_ciphers on;
   ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

   charset utf-8;

 # Load configuration files for the default server block.
   include /etc/nginx/default.d/*.conf;

   location / {
       try_files $uri $uri/ /index.php?$query_string;
   }

   if (!-e $request_filename) {
           rewrite ^(.+)$ /index.php?q= last;
   }

   location ~ \.php$ {
           fastcgi_split_path_info ^(.+\.php)(/.+)$;
      # Here we pass php requests to the php7.4-fpm listen socket.  
      # PHP errors are often because this value is not correct.  
      # Verify your php7.4-fpm.sock socket file exists at the below directory
      # and that the php7.4-fpm service is running.
           fastcgi_pass unix:/run/php/php7.4-fpm.sock;
           fastcgi_index index.php;
           include fastcgi_params;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           fastcgi_intercept_errors off;
           fastcgi_buffer_size 16k;
           fastcgi_buffers 4 16k;
   }

   location ~ /\.ht {
       deny all;
   }

   location = /favicon.ico { access_log off; log_not_found off; }
   location = /robots.txt { access_log off; log_not_found off; }

   access_log /var/log/nginx/ininja.access.log;
   error_log /var/log/nginx/ininja.error.log;

   sendfile off;

  }

  server {
      listen      80;
      server_name invoice.your-domain-here.com;
      add_header Strict-Transport-Security max-age=2592000;
      rewrite ^ https://$server_name$request_uri? permanent;
  }

```

Now, lets download the newest version of InvoiceNinja. Grab the newest invoiceninja.zip file from their [github releases page](https://github.com/invoiceninja/invoiceninja/releases).

```
cd /usr/share/nginx
sudo mkdir invoiceninja && cd invoiceninja
sudo wget <the newest zip release URL>
sudo unzip invoiceninja.zip
```

Once unpacked, we need to set up our encryption key.

```
php7.4 artisan key:generate
```

This key and several environmental variables are listed in a hidden `.env` file in the install directory. Look for it using `ls -al`.

Now, before we go any further, you need to decide if you wish to use the PhantomJS PDF renderer, or the snapPDF renderer. If this is going to be accessable from the internet, the PhantomJS renderer will work, but I hear its been discontinued. So if this is going to be local network only or you don't like the sound of using a discontinued component, then you want the snapPDF renderer.

We need to make some environment variable changes. Edit the `.env` file.

```
sudo nano .env
```

Scroll on down near the bottom where PhantomJS is enabled. It looks like this:

```
#options - snappdf / phantom / hosted_ninja
PDF_GENERATOR=phantom 
```
Go ahead and comment out the phantom generator, and add in the following lines.

```
PDF_GENERATOR=snappdf
PHANTOMJS_PDF_GENERATION=false
```

Ok, now since we edited the .env file we need to optimize the config, so run the optimize command. You have to run this command every time you edit the .env file and the command must be ran in the app directory.

```
sudo php7.4 artisan optimize
```

Now, lets install some of the required components to install snapPDF.

```
sudo apt install libgbm-dev libxshmfence-dev
```

Now, we need to install composer The version that currently is in the ubuntu repos is too old (v1.10) so we need to install the current version. Follow the install instructions on the [composer website](https://getcomposer.org/download/). I would do it from the home directory. When it tells you to move the composer.phar file, move it to: `/usr/bin/composer` using the following commands.

```
rm /usr/bin/composer
mv composer.phar /usr/bin/composer
```

Now, we can install snapPDF. They don't recommend to use sudo, but I found it works better. SnapPDF comes from this [github repo](https://github.com/beganovich/snappdf#installation). Just run the require command from the InvoiceNinja directory.

```
sudo composer require beganovich/snappdf
```

If everything comes back green then we are good to go.

Lets give nginx permission to access our InvoiceNinja install.

```
sudo chown -R www-data:www-data /usr/share/nginx/invoiceninja
```

Startup nginx.

```
sudo systemctl enable nginx
sudo systemctl start nginx
```

One final thing and if your running a test version, then I wouldn't worry too much about it, but for production this is required. However, its known that there is currently an issue with the crontab maintenance command not being detected by InvoiceNinja as running, so it adds a red triangle to the bottom of the interface.

```
sudo -u www-data crontab -e
```

Add the following to the www-data crontab.

```
* * * * * php7.4 /usr/share/nginx/invoiceninja/artisan schedule:run >> /dev/null 2>&1
```


## Credits

I have to admit that I did borrow quite heavily from the [InvoiceNinja example install forum post](https://forum.invoiceninja.com/t/install-invoice-ninja-v5-on-ubuntu-20-04/4588) for much of the initial install. However, the gotchas about composer I had to figure out myself.



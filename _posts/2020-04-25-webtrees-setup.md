---
title: Webtrees for Family Genealogy - Setup

categories:
    - Personal
---

I had been loosely looking for sometime for a personal family tree program. I wanted one that was web-based, had the ability to see a flowchart-like view for a family tree, and preferably free and open-source.

Well, I finally found something that for the moment fits the bill. Webtrees!

Webtrees is an open-source web-based family genealogy program. It has a slightly dated and slightly convoluted interface in my opinion and doesn't fit the requirements fully, but is the closest yet. 

Their instructions for getting webtrees installed are not the best, so I will be recording my version here.

I'm using Ubuntu Server 20.04 for my build.

Ubuntu Server 20.04 includes PHP 7.4 by default. For lower LTS versions, you will either need to install an older version of PHP or add a 3rd party repo to use 7.4. I prefer to use the most up-to-date software myself, but don't want to add additional repos to my servers with minor exceptions. So, for lower versions, such as 18.04, I just use the built-in PHP 7.2 instead.

----
<br/>

## First, we install the needed packages:


The PHP Libraries
```
sudo apt install php7.4 php7.4-xml php7.4-mbstring php7.4-curl php7.4-gd php7.4-intl php7.4-zip php7.4-mysql
```

Apache2 is automatically installed when PHP is installed, but you can check:

```
sudo apt install apache2
```

Install mysql as the backend database (you can use other databases with Webtrees)

```
sudo apt install mysql-server
```

## Setup mysql

# First - Secure setup

```
sudo mysql_secure_installation
```

The text based wizard will ask a few questions, I answer yes to all, select strong password requirements, and set a secure root password.

# Now regular sql setup

Please use a better password than "webtrees12345".

```
sudo mysql
create user 'webtrees'@'localhost' identified by 'webtrees12345'; 
create database WEBTREES character set UTF8;
grant all privileges on WEBTREES.* to 'webtrees'@'localhost';
exit
```

# Now to install webtrees itself.

Just pull the latest release from their github page. I download the zip file to my home folder first.

[Webtrees Github Releases page](https://github.com/fisharebest/webtrees/releases)

```
wget webtrees-github-zip-file-link
```

Then unzip the files.

```
unzip webtrees-release##
```

Now set the proper permissions

```
sudo chmod 700 -R webtrees/data
sudo chown www-data:www-data -R webtrees
```

Next move the files to the webhosting directory. I made my own directory under a subdomain of another domain I own.

```
sudo mkdir /var/www/subdomain.domain.com

cd webtrees
sudo mv * /var/www/subdomain.domain.com
```

# Next, some security clean-up for apache. 

Even though mine in self-hosted internally and not internet exposed, its good practice to secure everything.

```
sudo nano /etc/apache2/apache2.conf
```

Find the `<Directory /usr/share/>` and remove the directory definition.

Find `<Directory /var/www/>`

Remove `Index`

Removing Index disables directory browsing on the system




Now let's change some security headers.

```
sudo nano /etc/apache2/conf-available/security.conf
```

Change ServerTokens to `Prod`
Change ServerSignature to `Off`


Next, we need to tell apache about our new webtrees install.

```
cd /etc/apache2/sites-available
sudo nano subdomain.domain.com.conf
```
Here is the config that I use for apache. Replace the subdomain.domain.com parameters with your chosen domain name.
```
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName subdomain.domain.com
        DocumentRoot /var/www/subdomain.domain.com
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
        <Directory /var/www/subdomain.domain.com/data>
                AllowOverride All
        </Directory>
</VirtualHost>
```

Finally, let's turn on the new site's config and disable the default site's config.

```
sudo a2ensite subdomain.domain.com.conf
sudo a2dissite 000-default.conf

#Restart apache to pickup changes
sudo systemctl restart apache2
```

Then just run though the wizard and setup webtrees to your liking, using the local mysql database we setup earlier.



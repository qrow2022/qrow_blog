---
title: 

categories:
    - Linux
---

This is a post from my original blog, I've re-posted it here.

<br/>

---

<br/>

I know that `failtoban` is a very popular "firewall" for linux systems due to its versatility, however, I wanted to see if I could replicate some of the capabilities without needing to use it. I found that using the utility `ipsets` gave me some amount of the capabilities.

I made this using Centos 7, YMMV on different distros.

You will need to ensure that you have `ipset`, `wget`, and `iptables` installed.

## Make an ipset

`ipsets` are similar to an array listings of ip addresses or ip netblocks. You can use either one, but cannot as I understand it mix and match the two within one list.

So to create an `ipset` to hold our ip addresses:

<pre>
ipset create <i>setname</i> hash:ip
</pre>

where *`setname`* is the custom name you wish to give to the list.

or use: 

<pre>
ipset create <i>setname</i> hash:net
</pre>
for netblocks.

## Save the ipset

Next we need to save the `ipset` so that it is available after every restart. `ipsets` are lists that only exist in ram, so they need to be flushed to the disk. Currently our `ipset` is empty, so every time to make manual changes you will nee to save it.

<pre>
ipset save <i>setname</i> > /etc/sysconfig/ipset.<i>setname</i> 
</pre>


## Reboot reapplication and auto banning config

Next we need to create the auto-re-apply script so the set is reloaded into memory after boot. You need to create a script for each (unless you are better at scripting than me and can get them to work within a single file. I prefer separate files so I can disable, enable, and create new files with just small changes.)

I prefer to use `Nano` as my CLI test editor, you can use whatever you prefer.

<pre>
Nano /usr/sbin/ipset_activate_<i>setname</i>.sh
</pre>

The following is the script to go within the activate script. The *setname* is the name of the set to restore. The *ports to include* portion o the iptables rules are the ports that you want to expose and if anyone makes any contact with those ports they are automatically added to the set list.:

<pre>

#!/bin/sh
# load ipset sets from /etc/sysconfig
# ipset naming syntax is ipset.<i>setname</i>
find /etc/sysconfig -maxdepth 1 -type f -iname ipset.<i>setname</i> | while read SET;
do 
	/usr/sbin/ipset restore -! < $SET
	if [ $? -eq 0 ]; then
		logger -t ipset “success: restore of $SET”
	else
		logger -t ipset “fail: restore of $SET”
	fi
	sleep 1

	IPSET=${SET##*.}
	/sbin/iptables -I INPUT -m set --set $IPSET src -j DROP  ## must create this for each list
	/sbin/iptables -I INPUT -p tcp -m multiport --dports <i>ports to include</i> -j SET --add-set $IPSET src    ## can be created once
	/sbin/iptables -I INPUT -p udp -m multiport --dports <i>ports to include</i> -j SET --add-set $IPSET src    ## can be created once

	if [ $? -eq 0 ]; then
		logger -t iptables “success: add ipset $IPSET rule to iptables”
else
		logger -t iptables “fail: add ipset $IPSET rule to iptables”
	fi
done

</pre>

Go ahead and make the scripts executable:

<pre>
Chmod +x ipset_activate_<i>setname</i>.sh
</pre>


## Add to startup and Cron

We now will configure the activate scripts to run when the system boots and configure cron to save our `ipset` lists twice a day.

Edit the file `/etc/rc.local`
Add the following line for each activation script you want to run:

<pre>
/usr/sbin/ipset_activate_<i>setname</i>.sh
</pre>

Go ahead and make `rc.local` executable
```
Chmod +x /etc/rc.local
```

Next we will edit the cron to backup/save the sets twice a day, at noon and midnight.

Edit `/etc/crontab`

Add the following lines for each `ipset` you have created

<pre>
0 0 * * * root ipset save ipsetname > /etc/sysconfig/ipset.<i>setname</i> ## save at midnight
12 0 * * * root ipset save ipsetname > /etc/sysconfig/ipset.<i>setname</i> ## save at noon
</pre>


Go ahead and reboot now and see if your `ipsets` are listed and that `iptables` had picked up the new banning and blocking rules.

Check that `iptables` is running:
```
service iptables status
```

Check that the rules were added to `iptables`. They should be near the top:
```
iptables -L
```

Then check if the setlist exists and if they have any entries:
<pre>
ipset list <i>setname</i>
</pre>



## Extra credit / Optional - Add known bad actors to their own dedicated list

Go ahead and do all the above, but when creating your list ensure you use `hash:net` instead. Then create the following script:

<pre>
for IP in $(wget -O – http://www.ipdeny.com/ipblocks/data/aggregated/<i>countryX</i>.zone)
do
	sudo ipset add <i>new-setname</i> $IP
done

</pre>

What this file does is go out to a list of ip addresses assigned to a designated country (countryX) and pull down all the ip addresses and add them to the new ipset list.
To view the possible countries and get the full URL links to the lists visit
	[http://www.ipdeny.com/ipblocks/](http://www.ipdeny.com/ipblocks/)

<br/>

--Qrow

<br/>
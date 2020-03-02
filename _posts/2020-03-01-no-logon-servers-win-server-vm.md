---
title: Fix - "no logon servers are available" Windows Server VM deployed from OVA without sysprep and having AD installed.

categories:
    - Microsoft
---

### Background

This is an issue that I have encountered several times before. I help assist teach a Windows class at a University near me and the class goes over Active Directory as part of the teaching. We use Vmware Workstation as our virtualization platform of choice currently.

In the last few sememsters we took up the idea of conducting case studies where the professor and I build broken VMs that the students have to find out what is the problems and repair them. The issues are common minor issues that a seasoned pro would fix quickly, but most of these students have just seen Windows server for the first time and these are difficult issues.

What we do is deploy a new vanilla Windows Server instance and install Active Directory, DHCP, DNS or whatever else we have gotten to in the course and then proceed to break items. Such as incorrect DNS entries, invalid IP Configurations, ect.
Then we export the VM to an OVA file and distribute it to the students where they proceed to import it.

However, ocassonally, we get some issues around unreachable login servers. This is usually tied to the IP configuration not being correct enough for the server to reconize itself and start the AD services.

Sometimes its the student's fault for not reading directions and putting the VM on the physical network instead of isolated networks. Once the VM has started it cannot recover from the nic being connected wrong even if you shut it down and switch the nic.

Sometimes it just happens for no apparent reason. 

For some of these, particuarly the wrong nic config cause, it can be fixed by just re-importing the OVA and ensuring the nic is configured properly in Vmware first before booting the VM.

For the others, there is a fix where I have not yet had not work, but requires someone who knows their navigation and operating system behavior to discover.

## The Fix

The fix that I have discovered that seems to always work is as follows. What this fix does is give the server time to find itself and reconize that it is its' own DNS server and can allow the AD services to start.

**The pictures are from a 2012R2 installation, but this should work with 2016 and 2019.**

First, make sure that the nic is connected to the isolated internal network

Second, crash the VM two or three times. We want the server to detect an error and give us the option to boot into safe mode. I usually do this just by starting the VM and once I see the Windows Boot Logo, I just Power Off the VM. I do this two or three times.

When you see the `Preparing Automatic Repair` progress bar, you are in the first part of safe mode.



![Preparing Automatic Repair Progress Bar](/assets/images/No_Logon_Servers_Fix/prep_auto_repair.png)



Then when we get the options, we select **Troubleshoot**:

![Select Troubleshoot Option](/assets/images/No_Logon_Servers_Fix/troubleshoot.png)


Then **Startup Settings**:

![Select Startup Settings Option](/assets/images/No_Logon_Servers_Fix/startup_settings.png)


Then click **Restart**

![Confirm Reboot](/assets/images/No_Logon_Servers_Fix/reboot_confirm.png)

Then on the Advanced Boot Options screen we select `Safe Mode with Networking`:

![Safe Mode With Networking](/assets/images/No_Logon_Servers_Fix/safe_with_network.png)

Once the server has booted, login with the default administrator account (If it has not been disabled, otherwise, a recently logged in admin account).

Open the run box and issue the command `msconfig`:

![Run MSCONFIG](/assets/images/No_Logon_Servers_Fix/run_box.png)

Then on the Boot tab of the `msconfig` window, make sure to uncheck the Safe boot check box.

![Uncheck Safemode Checkbox](/assets/images/No_Logon_Servers_Fix/safe_mode_checkbox.png)

Apply and close the `msconfig` box. Go ahead and reboot and the system should work now.


--Qrow

<br/>
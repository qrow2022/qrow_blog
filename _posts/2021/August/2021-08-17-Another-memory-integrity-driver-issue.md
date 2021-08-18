---
title: A second memory integrity driver issue.

categories:
    - Microsoft
---


# Warning!! This post has the potential to mess-up your PC. I don't have any responsibility if you mess-up your PC. You have been warned.

Well, I found another driver that's not compatible with memory integrity. This time, its a WD driver for an older WD My Password Ultra external USB drive. I use many different external drives and this one I hadn't used in a while and was working with a system that I hadn't enabled memory integrity on yet and lo and behold, another incompatible driver. 

Now, the My Passport Ultra is a no-longer fully supported drive as far as I can tell. When I looked at WD's list of EOL devices I didn't see it listed.

Either which way, this has caused some upset over in [WD's forums](https://community.wd.com/t/unable-to-enable-core-isolation-memory-integrity-due-to-western-digital-driver-windows-10-2004/252131/16) as well as a [Microsoft Forum posting](https://answers.microsoft.com/en-us/windows/forum/all/core-isolation-memory-integrity-fails-to-enable/b5673d5c-f3ce-4f0d-89c4-0f6f60527883).

Now I previously posted about [enabling memory integrity]({% post_url /2020/December/2020-12-18-Remove-Driver-Enable-Mem-Integrity %}). The method I used there didn't work as well in finding the WD driver, but the method on WD's forum that someone posted using the "pnputil" command did work.

Here's the steps.

Open an administrative cmd prompt.

```
pnputil /enum-drivers
```
This will list all the 3rd party drivers. Go ahead and search for the one that corresponds to what Memory Integrity is complaining about.

```
pnputil /enum-devices /connected
```
This will list all devices currently connected to the system. Double check that the same driver is not being used by another device.

```
pnputil /delete-driver oem#.inf /uninstall /force /reboot
```
This will forcefully delete the specified driver, indicated by the oem number and then reboot the computer if needed.

That should do it. The drive still works for me, I suspect its just using a more generic driver, but I don't care. Storage is storage.
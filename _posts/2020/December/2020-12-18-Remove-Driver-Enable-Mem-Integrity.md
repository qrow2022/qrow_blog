---
title: Remove unused drivers/bad drivers to enable Memory Integrity

categories:
    - Microsoft
---


# Warning!! This post has the potential to mess-up your PC. I don't have any responsibility if you mess-up your PC. You have been warned.


Windows 10 has a security feature that your hardware and software config both have to support to enable, its called Memory Integrity.
What memory integrity does is way beyond this blog post, but to be quick about it, its about protecting memory regions of programs and data and ensuring that they are not tampered with.

Here are some resources on what memory integrity is:

[How-to-Geek: Memory Integrity and Core Isolation](https://www.howtogeek.com/357757/what-are-core-isolation-and-memory-integrity-in-windows-10/)
<br>
[Microsoft: Memory Integrity - Windows Security](https://docs.microsoft.com/en-us/windows/security/threat-protection/device-guard/memory-integrity)

So, you need some relatively modern hardware to enable memory integrity but otherwise, on the hardware side thats it.

For the software, the drivers must have been compiled with memory integrity compatibility in mind. Modern drivers by reputable companies all should have been updated, however in my case when I went to enable MemInt it gave me an error and said that I had 2 drivers that were not compatible. 

The first driver I knew what it was and could remove it and I expected that when I used the device after enabling MemInt that it would install an updated driver. So I just removed the driver for the device using Device Manager. Make sure to enable `Show Hidden Devices` to find your device. 

However, the other driver was for an old Logitech mouse that had died on me and I had removed the logitech device customization program, but it left the driver behind. A quick search for the driver's name showed that this was a common issue. Logitech had abandoned essentially this older version of the program and never released updated drivers for proper Windows 10 support (including MemInt support). Instead, they wanted everyone to use the new program Logitech G Hub. 

Well, that was fine for me as I had a new logitech mouse on order and was using a backup mouse for the time being. The issue though was how to remove the driver. It didn't showup in Device Manager. Also, there was no docs on how to remove it. So, here's the solution.

I had to use some command line tools to both find and remove it. It was identifying as a kernel based driver, which both scared and didn't surprise me at all. The lack of surprise is due to how deeply integrated and trusted Human Interface Devices (HIDs) are in Windows (that's another blog post). The scare was, "Can I remove this without damaging the kernel and requiring a re-install?"

Thankfully, I was able to remove it without any trouble. However, I don't recommend doing this for graphics drivers. There is a program called DDU for this that uses Windows's safe mode to perform the removal. In any case, I ask that you please be careful in removing any drivers on your system.

## First, find info about the driver.

This first part is safe as we are just finding info out about the driver. In an elevated command prompt type the following:

```
driverquery /v | more
```

The command `driverquery` runs a program that enumerates and lists all drivers that are installed on the system, irregardless of if they are in use or inactive.
The `/v` tells the program to be more verbose about each driver.
The `| more` will pipe the command through the `more` command which will give us paged output of the command, allowing us to more easily parse the output. You can also pipe the output to a text file:

```
driverquery /v >> C:\location_of_output_file.txt
```

Then just look through the output until you find the driver thats causing the issue.

You can also use the `SC` program to find the driver. Its also the program that we will use to remove the driver as well.

If you know the driver you want in not in use and inactive, you can use this command to search for it:

```
sc query type= driver state= inactive
```

Take note of the space after each equals sign, that is required. You can also pipe this command to a text file just like the previous command if it helps.

## Remove the driver

Once you have found the driver you wish to remove, the "service name" thats listed is the *keyname* needed for the removal command.

<pre>
sc delete <i>ServiceName</i>
</pre>


## Conclusion

And there you have it. If you've done it right, the driver should have been removed, and if that was the only one blocking Memory Integrity from activating, try it again and it should work now.


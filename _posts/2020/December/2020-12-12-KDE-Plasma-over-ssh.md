---
title: Access KDE Plasma desktop over SSH connection

categories:
    - Linux
---

I'm primarily a Windows user, but I have an older Dell laptop that I installed POP_OS on late last year. Every once in a while, I want to access that laptop from my Windows Desktop.

Now I'm not new to ssh, but I can always learn something new. However, for the applications that I run, I prefer to have a desktop environment. When I learned that you could pass a desktop environment over SSH using x11, I immediately attempted it. I was successful and used it a few times before a long break of not using it. 

When I went back a few months ago to use it however, it no longer worked. I kept getting errors about not being able to start kde. Yes, KDE is my environment of choice for linux, but I do occasionally use Gnome as well.

I didn't have the time to chase it down and thought it might be some kind of bug, so I left it alone and only recently came back to the issue.

I found that KDE actually changed the command to start KDE from `startkde` to `startplasma-x11`. I use both MobaXterm and x2go on windows, and they both have the `startkde` command hardcoded. However, I found that if you create a link from `startplasma-x11` to `startkde` then it works.

The command to create the link is a follows:

```
sudo ln -s /usr/bin/startplasma-x11 /usr/bin/startkde
```

Now, when those programs startup KDE, they will call the correct binary.
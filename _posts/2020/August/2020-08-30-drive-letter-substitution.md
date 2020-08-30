---
title: Mount folder using drive letter from command line.

categories:
    - Microsoft
---


Now, this is just a short post, but its one that gets me back into attempting to post regularly. Also, this is something that I run into frequently myself and so I said "just make a post about it". So, here it is.


Sometimes, you need to access a file that is either in a file structure that is too deep, or has too long of a name. Windows has a character limit for file pathing (an issue that linux doesn't deal with at all as far as I'm aware). That file path limit is 255 characters, even though NTFS supports much deeper limits (how does 65,535 deep sound?). 

I occasionally run into this at home with automated scrapers and downloaders. Since they automatically name files they bypass the errors and warnings that prevent this type of action from a human.
For work, I usually find this on a file server, particularly a badly maintained/designed one and from the server side in particular. 

I usually have to either move the file, or perform recovery when I encounter issues like this. I found this trick years ago and have used it quite well to fix these kinds of issues.


# Mount the folder

When you mount a folder to a drive letter within windows, you bypass the character limitations as the count starts over at the point you mounted.

I know you can mount folders as drive letters through the GUI (Disk Management, "Remote" share mounting, etc.) however, this method saves me from needing to type often complex locations into those selection boxes, and while there is a browse button as well as copy paste, I'm already where I want to be, so why not just perform the action there.

In the location bar for File Explorer, you can actually type commands and they will be executed in that location.

So, in the location bar just type the following to mount the current folder to the "K" drive for example:

```
subst K: .
```

The `subst` command is just the substitute program that we are calling.
The `K:` tack is the drive letter that we want to mount the folder to.
And finally the period `.` says "right here, this current location".



# Remove mount

When you want to remove the mount, in the location bar again, just type:

```
subst K: /D
```
The `subst` command is just the substitute program that we are calling.
The `K:` tack is the drive letter that we want to remove.
The `/D` tack says to delete the connection.


And there you have a quick and dirty way of mounting a folder of a file that you spent so much time finding only to find that you can't open it since its too long of a file path.


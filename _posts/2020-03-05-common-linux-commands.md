---
title: Commonly used linux command reference

categories:
    - Linux
    - Cheat Sheets
---


Here is a list of commonly used linux commands along with their common command line switches. 

I'll be updating this as I come across commands I either need to use frequently, or need to lookup frequently.


## Move / Rename a file

<pre>
mv <i>SourceFile DestinationFile</i>
</pre>


## Run Updates
### Debian/Ubuntu Based

```
sudo apt update #Check if there are available updates
sudo apt upgrade -y #Apply any found updates, and answer Y for any simple Y/N questions.
```

### Red Hat/Centos Based
```
yum update -y #Check for updates, and apply them if they are found
yum update -d #Check for updates, and only download them
```


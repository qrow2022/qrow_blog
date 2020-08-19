---
title: PowerShell File Backup Script

categories:
    - PowerShell
    - Microsoft

---

At my first job, one thing that my boss wanted me to do was write a macro in Word to backup all the files in a particular directory. I believe it was because he was changing the template that all the files were based on, and he wanted to have the originals in case they got messed up.

Now before you sound off in the comments:

1. I was still relatively new to programming of any kind. The most I had ever done was some simple HTML and CSS, (The original versions mind you). So I didn't know that something like PowerShell could do this for me.

2. We did have a backup system in place, this was just to accent and put off having to use the restore functions just for this.

3. The boss is the boss.

Either way, not knowing MacroVB, I had to spend a day or two figuring it out, and then we only used it once as far as I was aware. However, I recently remembered doing this and thought that I would revisit this, only in PowerShell. 

I went ahead and published the script on my Github, but this was mostly for me to learn more PowerShell. I don't provide any guaranties with the script. 

## WARNING
# The script will delete any files and folders it finds in the destination directory, so make sure that its empty. The script calls this out a few times, so you have been warned.


[File Backup Script](https://github.com/qrow2022/Folder-backup-script)

-- Qrow
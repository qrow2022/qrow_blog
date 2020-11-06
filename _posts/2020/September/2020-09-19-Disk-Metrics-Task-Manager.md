---
title: Enable Disk Metrics in Task Manager for Server 2012 and Higher

categories:
    - Microsoft
---

Microsoft removed the disk metrics category in the performance tab in Server 2012. They claimed that it was too aggressive on the hard drives in polling for performance data. My philosophy is, if you don't like how it works, then <i><b>change it or optimize it but don't remove it! You think its too aggressive? Then make it less aggressive and more efficient!! Your FREAKING MICROSOFT!! /Rant </b></i>

Anyways, if you need to re-enable the performance metrics, like I prefer to, then this command will turn it back on.

Use an Administrative prompt for these.

To turn it on:
```
diskperf -y
```

To turn it back off:
```
diskperf -n
```
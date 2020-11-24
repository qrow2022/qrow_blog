---
title: Windows 7 SMB issue - Error Code 0x80004005

categories:
    - Microsoft
---


I really hate the error codes in windows that either don't mean anything, or are just catch-all errors that will fire for just so many different types of issues.

This particular issue was discovered in a Windows 7 PC. I suspect that it's present possibly as far back as Vista, and up to Win10 (I don't remember if XP had these functions, I know Server 2003 did though, so it might?).

Anyways, the issue was that SMB access suddenly stopped working on a Windows 7 Client and when attempting to access shares, even VIA IP address the OS would just spit out "Error 0x80004005". Of course, that's not helpful. Particularly since if you look that error up all the sites point to Windows Update cache issues, which has nothing to do with SMB.

Turns out that the "Client for Microsoft Networks" protocol on the network adapter had somehow been removed. After re-installing it SMB started working again.
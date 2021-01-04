---
title: Powershell - Escape spaces for scripts

categories:
    - Powershell
---

When writing scripts for powershell, or any kind of automation language really, you occasionally need to have spaces within your script. Either as file paths, file names, or any other reason, but file paths and names are the top two reasons I suspect. Most command processing languages will use spaces as special characters for seperation of arguments. You have to perform special escapes to use a space as a space and not a seperator. 

For powershell scripting, the method is utilizing the little backtick character (`) on the same key as the tilde (~), below the escape key commonly.

Place this backtick just before the space and powershell will detect the space as a space.

Example:

```
C:\Program` Files\Excellent` Software` Dev\SomeProgram.exe
```
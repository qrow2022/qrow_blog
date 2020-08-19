---
title: Enabling responsible disclosure via security.txt file

categories:
    - Web Security
    - Pentesting
---

In doing some cruising through Youtube on April Fools day this year (2020), I came across a LiveOverflow April Fools video about the Security.txt file for websites. In his description he pointed to another youtuber who was actually involved in create this standard a few years prior and so I did some research. 

Its a draft RFC standard, and actually builds off of another standard that was published in 2010.

The original standard which is RFC [5785](https://tools.ietf.org/html/rfc5785) created a directory for websites to contain information that may be required for operation of the site, but might conflict with content, such as the ACME certificate renewal files. These files would be placed in a directory called .well-known, yes the period is required as part of the name.

The new draft RFC is for a file that is placed in that .well-known directory called security.txt. Here is the current [draft](https://tools.ietf.org/html/draft-foudil-securitytxt-09). The draft proposes a solution to the age old problem of "I have a security issue to report, but don't know how to contact the company!" The security.txt file contains contact information for the company about where to send security reports, not just about websites, but about their products as well.

Here is a link to the [source site](https://securitytxt.org/) that explains how the proposal works and has a generator for you to make your own file.


I went ahead and added one to the blog here, but as its a blog, there probably won't be much.

Here is the path that the proposal/RFC requires.

https://qrow.technology/.well-known/security.txt


-- Qrow
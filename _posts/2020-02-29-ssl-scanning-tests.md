---
title: SSL Testing Sites

categories:
    - SSL
---


This is a post from my original blog, I've reposted it here.

<br/>

----

<br/>


For any tests against web-servers where I check if their SSL/TLS configuration is correct, I use both [ssllabs.com](https://www.ssllabs.com/ssltest/) and [High Tech Bridge](https://www.immuniweb.com/ssl/) for my tests. (High Tech Bridge has changed their name and domain, they are now ImmuniWeb)

[ssllabs.com](https://www.ssllabs.com/ssltest/) is the industry standard for checking SSL security for web-servers.

However, two advantages of [High Tech Bridge](https://www.immuniweb.com/ssl/) is that it can also scan other SSL/TLS enabled ports, like email ports, and will check for PCI-DSS, HIPPA, NIST, and Best Practices compliance. ~~Unfortunately, it seems to mark some ciphers that are known to be weak as required for HIPPA and NIST~~.  The previous is no longer the case as they now comply with newer HIPPA and NIST requirements, as well as check for TLS 1.3. It also has a [web-server scanner](https://www.immuniweb.com/websec/) that will check what headers are presented to the end user and will check things like XSS vulnerabilities and HSTS.

In any of my posts that involve changing of SSL/TLS security, I will be recomending to use the two above services to check your changes, however, they are not the only sites available for such tests.

–Qrow
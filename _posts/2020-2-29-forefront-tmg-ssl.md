---
title: Forefront TMG SSL

categories:
    - "Microsoft"
    - "SSL"

---

This is a post from my original blog, I've reposted it here.

This blog post is on Forefront TMG, a product that has been fully discontinued by Microsoft, and usually was installed on Server 2008/2008R2 versions, which have not received a TLS 1.3 backport update, instead capping out at 1.2. As well, TLS 1.2 and 1.1 are on the list to be depreciated in 2019 and 2020 as they are older protocols and the new 1.3 is much more secure by default, and faster.
However, many companies wish to perform inbound and outbound traffic inspection, and TLS 1.3 has yet to allow for this kind of Man in the Middle attacks that many businesses employ as part of their security and employee monitoring strategies.

<br/>

---

<br/>

These are changes to make to your forefront firewalls to disable the poodle SSLv3 vulnerabilities and to get an A rating on [ssllabs.com](ssllabs.com) for your websites (or from [www.htbridge.com/ssl](www.htbridge.com/ssl)).

*Note: with the depretiation of TLS 1.1 and 1.2, you can no longer receive* **A** *ratings from these test sites until they are disabled and TLS 1.3 is being used instead.*

#### Registry changes to remove SSLv3, and enable higher level TLS protocols.

Navigate to 

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL`

Add the following Keys and subkeys under Protocols

```
- SSL 3.0
    - Server
    - Client (optional)
- TLS 1.0
    - Server
    - Client (optional)
- TLS 1.1
    - Server
    - Client (optional)
- TLS 1.2
    - Server
    - Client (optional)
```

The `Server` keys control when the server or workstation is *Serving* content to outside parties.
The `Client` keys control when the server or workstation is getting content from remote locations.


Under the SSL 3.0 server key, and optional client key, add the following dword entries
`DisabledByDefault = 1`

Under the TLS versions that you wish to support, create the dwords
```
DisabledByDefault = 0 
Enabled = 1
```

If you disable TLS 1.0, then you will need to enable the following under group policy,
```
Local Computer\Windows settings\security settings\local policies\security options
```

Look for “System Cryptogrophy: use FIPS compliant algorithms for encryption, hashing, and signing.”

This will reallow the local SQL server instance to start and connect properly to forefront to reenable SQL logging, but will disrupt RDP.


Install the following patch on the TMG servers and the clients that will be connecting to them for management over RDP

[KB3080079: Update to add RDS support for TLS 1.1 and 1.2 In Windows 7 and Server 2008R2](https://support.microsoft.com/en-us/help/3080079/update-to-add-rds-support-for-tls-1-1-and-tls-1-2-in-windows-7-or-wind)


For insecure renegotiation, you must have [MS10-049](http://support.microsoft.com/kb/980436) installed.


Then set the following Dword under `SCHANNEL`
```
AllowInsecureRenegoClients = 0
```

DDOS prevention Dword under `SCHANNEL`
```
DisableRenegoOnServer = 1
```



Cipher Changes
	Be careful about cipher changes, disabling the wrong ciphers can lock you out of remote desktop. Recommended to have the ECDHE ciphers first, for speed.



References:
- [https://tmgblog.richardhicks.com/](https://tmgblog.richardhicks.com/)
    - [https://tmgblog.richardhicks.com/2016/12/27/disable-ssl-3-0-and-tls-1-0-on-forefront-tmg-and-uag-2010/](https://tmgblog.richardhicks.com/2016/12/27/disable-ssl-3-0-and-tls-1-0-on-forefront-tmg-and-uag-2010/)
    - [https://tmgblog.richardhicks.com/2014/08/28/enable-tls-forward-secrecy-for-forefront-tmg-2010-published-web-sites/](https://tmgblog.richardhicks.com/2014/08/28/enable-tls-forward-secrecy-for-forefront-tmg-2010-published-web-sites/)
    - [https://tmgblog.richardhicks.com/2014/09/08/recommended-forefront-tmg-2010-ssl-and-tls-configuration/](https://tmgblog.richardhicks.com/2014/09/08/recommended-forefront-tmg-2010-ssl-and-tls-configuration/)
- [http://techgenix.com/improving-ssl-security-forefront-threat-management-gateway-tmg-2010-published-web-sites/](http://techgenix.com/improving-ssl-security-forefront-threat-management-gateway-tmg-2010-published-web-sites/)


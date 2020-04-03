---
title: Exchange Online PowerShell Commands

categories:
    - Microsoft
    - Exchange Online
    - PowerShell
---

Here is a list of Exchange Online Powershell commands that I have had to research to fix some somewhat obscure issues.



# Connect to Exchange Online with MFA

<pre>
Connect-ExchangeOnline -UserPrincipalName <i>useraccount@domain.com</i> -ShowProgress $true
</pre>


# Add email alias to Office365 Group

<pre>
Get-UnifiedGroup <i>#Returns the List of all groups in Office365</i>

Set-UnifiedGroup -Identity <i>GroupName</i> -EmailAddresses @{Add="<i>newalias@newdomain.com</i>"}
</pre>
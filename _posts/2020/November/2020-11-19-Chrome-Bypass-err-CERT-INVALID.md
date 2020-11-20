---
title: Bypass Chrome error - NET::ERR_CERT_INVALID

categories:
    - Chrome
---


I knew that all the browsers were changing their error page handling for invalid certs and insecure pages. However, this one snuck up on me.

I had just spun-up a new Wazuh test system based on their OVA appliance and when I went to go to the web console I couldn't bypass the error message about the invalid certificate. The "Take me there anyways" button was missing. As a person who uses internal systems that sometimes have weird cert issues I need to bypass those error messages, but I know what those error messages are attempting to tell me and that they are attempting to stop regular users. However, as a security pro I need to bypass them typically to either first-time configure something, or because it's in a test env. its ok to use as is.

Either way, to bypass this error without the "proceed" button, just type the following on the page. You don't need to type this in the URL bar or anything, just click on the page and type one of the following:

`badidea` or `thisisunsafe` Once you type one of those chrome will automatically proceed past the error message.

I suspect that chrome child browsers will eventually implement this as well too.

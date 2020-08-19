---
title: Debloating Samsung Android Devices

categories:
    - Android
---


I love Samsung hardware. I don't care too much though for their bloatware. They are somewhat better now than they used to be though. And every phone manufacturer (aside from Google, but that opens another discussion on ownership of Android itself and Google services) has bloatware of their own to an extent.

For this post, a relative of mine recently had to upgrade their phone due to the verizon sunsetting of 3G connectivity. We knew this was coming more than a year ago, but verizon postponed it once, so we waited a while longer to get one. Well, they recently got a new phone through Tracfone and I helped them migrate and debloat the new phone. 


# ###WARNING!####

This process has the potential to brick your device if you are not careful. I take no responsibility for any damage that may ensue. Proceed at your own risk.



## Install ADB

If your on linux then just use the package manager and install ADB

```
apt install android-tools-adb android-tools-fastboot
yum install android-tools-adb android-tools-fastboot
```

If your on windows, then you can use chocolaty to install or just download the ADB executable from google's android dev site (which is the method I prefer, but requires navigating to their location in the command prompt window to use it, as I don't add them to the environment path.):

[Google dock on how the use ADB](https://developer.android.com/studio/command-line/adb)
[ADB Download Page](https://developer.android.com/studio/releases/platform-tools)


## Enable ADB Access

You will have to enable developer mode on your android, but once your done you can disable dev mode.

Under settings > about, tap on the build number 7 or 8 times and the phone will pop a message that your a developer.

Then just go to settings > developer and enable USB debugging / Android Debugging.

Once you plug your phone into your computer and have the ADB daemon running, the phone will detect that and ask you to allow the connection. Just hit allow and your good to go. The ADB daemon auto launches when you run an ADB command.



## The commands:

I use ADB to remove the bloatware that I don't want on the device. A more complete command list can be found on [Chris Titus Tech's blog](https://christitus.com/debloat-android/), but here are the commands that are needed for this:

# Connectivity Commands:
```
adb devices # This will list all devices connected to the computer and if they are in allow mode
adb shell # This will drop into a command shell for the device
```
# Package Commands:
```
adb shell pm list packages # This will list all installed packages on the device
adb shell pm list packages | grep *packageName* # This will search for a package by the *packageName* parameter. Such as *facebook*
adb uninstall com.packageName # the packageName is the name of the package that you wish to remove.
```
Quite commonly the `adb uninstall com.packageName` command will not work and error out with “[DELETE_FAILED_INTERNAL_ERROR]”. So, I typically use the following command instead:
```
adb shell pm uninstall --user 0 <appname> # Where <appname> is the name of the package to remove.
```
Another tip is that I like to have two ADB prompt windows open at once, one for the listing and searching of packages, the other for removal.


## Packages I Remove

Here is a listing of the packages that I like to remove on smartphones, this list is not necessarily limited to Samsung devices. There are apps here that are present on many different phones. I've commented on what the app is as far as I am aware.


```
com.king.candycrushsaga		Candy Crush
flipboard.boxer.app			Flipboard
com.pandora.android			Pandora
net.peakgames.toonblast		Toon Blast Game
com.contextlogic.wish		Wish
in.playsimple.wordtrip		Word Game
com.particlenews.newsbreak	News App
com.epicactiononline.ffxv.ane	Final Fantasy App
in.playsimple.tripcross			Crossword Game
com.sec.android.app.sbrowser	Samsung Internet Browser
com.tracfone.generic.mysites	Tracfone MySites Browser Shortcuts
jp.gocro.smartnews.android		SmartNews app
com.samsung.android.app.notes	Samsung Notes
com.tracfone.preload.accountservices	Tracfone Device Pulse
com.samsung.android.email.provider		Samsung Email app
com.facebook.katana				Facebook
com.facebook.appmanager
com.facebook.system
com.facebook.services
com.tracfone.preload.customerservices	Some kind of tracfone app - called "Inbox"
com.handmark.expressweather		1Weather app
com.samsung.oh			Samsung Members app
com.samsung.android.app.spage		Bixby Home
com.samsung.android.mobileservice	Samsung Experience App
com.samsung.android.scloud			Samsung Cloud
com.samsung.android.calendar		Samsung Calendar app
com.tracfone.wifiutility2		Tracfone """WIFI""" utility (Junk app)
com.sec.android.daemonapp		Built-in weather app
```

Here is a list of apps that I would recommend to be carefully consider if you want to remove them.

```
com.google.android.googlequicksearchbox		"OK Google" Interface
com.sec.android.app.samsungapps		Samsung Galaxy Store
com.sec.android.widgetapp.samsungapps	Samsung Galaxy Store Widget
```

The galaxy store app is samsung's app store, and while I don't use it, the visual voicemail app that I use comes from there by default. On a new out-of-box phone, the voicemail app is installed, but in a partly disabled state and once you receive your first voicemail a notification will ask you to enable and update the app. It cannot update and enable if the store is removed. So, if you remove the galaxy app store, then the voicemail app cannot engage.

The google assistant app I don't use either, but have not yet ascertained the impact on android's stability if its removed. I disable it from the apps list in android so that helps, but I would like to remove it at some point.



## Additional App Removal

If there are any other apps you would like to remove, then I would recommend one of two ways to find out what they are.



If you know the package name, but not what the app is, then you could possibly find out what the app is through the play store.

Just open the play store in a browser on a computer select the first app listed to get the query string, then replace the query string with the package name.

An example in pictures if I wanted to know what the facebook app was:


Even though Facebook is the on the front page, lets open instagram to search for it.
![Front Page of App Store](/assets/images/Debloat_Samsung_Android/Capture.PNG)


In the URL bar, that section after `id=`, replace all the text afterwords with the package name your looking for, then hit ENTER.
![Instagram URL](/assets/images/Debloat_Samsung_Android/Capture2.PNG)
![Modified URL for Facebook](/assets/images/Debloat_Samsung_Android/Capture3.PNG)


If the app is listed with the play store, then you should find the app's page, otherwise you will see this unknown screen.
![Google Error Page](/assets/images/Debloat_Samsung_Android/Capture4.PNG)


If you know the app name, but not the package, then you can try to search on the play store for the app and use the package name in the URL bar.

Another option, is to use an app that lists all packages on your phone and allows you to search them and get the package names. Its called: [App Inspector](https://play.google.com/store/apps/details?id=com.ubqsoft.sec01)


That should basically do it. Remember your mileage may vary and if you accidentally brick your device, it's not my fault.
# carthing.wiki — Combined Documentation

> Crawled 26 pages from `https://carthing.wiki/first-steps/flashing/` (depth 10, 5s)

## Table of Contents

### Depth 0

- [flashing](#https-carthing-wiki-first-steps-flashing)

### Depth 1

- [flashing](#https-carthing-wiki-first-steps-flashing)
- [setup-env](#https-carthing-wiki-legacy-setup-env)
- [mediawin](#https-carthing-wiki-thinglabs-apps-deskthing-apps-mediawin)
- [utility](#https-carthing-wiki-thinglabs-apps-deskthing-apps-utility)
- [weather](#https-carthing-wiki-thinglabs-apps-deskthing-apps-weather)
- [spotify](#https-carthing-wiki-thinglabs-apps-deskthing-apps-spotify)
- [system](#https-carthing-wiki-thinglabs-apps-deskthing-apps-system)
- [faq](#https-carthing-wiki-troubleshooting-faq)
- [introduction](#https-carthing-wiki-thinglabs-apps-deskthing-introduction)
- [weatherwave](#https-carthing-wiki-thinglabs-apps-deskthing-apps-weatherwave)
- [server-config](#https-carthing-wiki-thinglabs-apps-deskthing-server-config)
- [adb](#https-carthing-wiki-legacy-adb)
- [vinyl_player](#https-carthing-wiki-thinglabs-apps-deskthing-apps-vinyl-player)
- [alternative-flashing](#https-carthing-wiki-legacy-alternative-flashing)
- [managing-apps](#https-carthing-wiki-thinglabs-apps-deskthing-managing-apps)
- [faq](#https-carthing-wiki-thinglabs-apps-deskthing-faq)

### Depth 2

- [setup-env](#https-carthing-wiki-first-steps-setup-env)
- [faq](#https-carthing-wiki-thinglabs-apps-deskthing-faq)
- [faq](#https-carthing-wiki-troubleshooting-faq)
- [alternative-flashing](#https-carthing-wiki-legacy-alternative-flashing)
- [managing-apps](#https-carthing-wiki-thinglabs-apps-deskthing-managing-apps)
- [adb](#https-carthing-wiki-legacy-adb)
- [server-config](#https-carthing-wiki-thinglabs-apps-deskthing-server-config)
- [introduction](#https-carthing-wiki-thinglabs-apps-deskthing-introduction)
- [setup-env](#https-carthing-wiki-legacy-setup-env)

---

<a id="https-carthing-wiki-first-steps-flashing"></a>

## https://carthing.wiki/first-steps/flashing/

| Source | `https://carthing.wiki/first-steps/flashing/` |
|---|---|
| Depth | 0 |

[Skip to content](https://carthing.wiki/first-steps/flashing/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/first-steps/flashing/#_top)
    * [ Flashing with Terbium on Windows ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-windows)
    * [ Flashing with Terbium on Mac ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-mac)
    * [ Flashing with Terbium on Linux ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-linux)


## On this page
  * [ Overview ](https://carthing.wiki/first-steps/flashing/#_top)
    * [ Flashing with Terbium on Windows ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-windows)
    * [ Flashing with Terbium on Mac ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-mac)
    * [ Flashing with Terbium on Linux ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-linux)


# Flashing the Car Thing
This page provides step-by-step instructions for flashing the Spotify Car Thing with the Thing Labs OS using the Terbium webpage. Prefer video guides? See the 
![The Terbium home screen](https://carthing.wiki/_astro/terbium-restore-local.kWUo4ngF_Z2oHYQd.webp)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-3)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-4)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-5)


### Flashing with Terbium on Windows
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Flashing the Car Thing from Windows USB drivers to be installed. From Windows PowerShell, send the following command:

```

irm https://driver.terbium.app/get | iex

```

Having problems with the script? The Zadig application can also be used to load the WinUSB driver, see [Legacy - Setting Up](https://carthing.wiki/legacy/setup-env). 
7.) Select the **Done** button.
8.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
9.) Select the device, then **Connect**.
If the system has been used to flash Car Thing previously using a legacy method, an “Access Denied” error may appear. This is the result of incorrect drivers being installed. To remove old drivers, open Windows Device Manager and look for either “GX-CHIP” or “WorldCup” in the list of devices. If one of these devices is found, right click and select **Uninstall device**. Next, select **Attempt to remove the driver for this device**. Finally, select **Uninstall**. This may need to be performed multiple times to ensure all previous drivers are removed. If the GX-CHIP device shows a warning symbol, install the driver again with the command in the described in step 6. 
10.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
11.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
12.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
13.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
14.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**
### Flashing with Terbium on Mac
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Select the **Done** button.
7.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
8.) Select the device, then **Connect**.
9.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
10.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
11.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
12.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
13.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**
### Flashing with Terbium on Linux
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Select the **Done** button.
7.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
8.) Select the device, then **Connect**. you may need to setup udev rules to allow access to the Car Thing. Open a terminal and run the following command:
It may be necessary to setup udev rules to allow access to the Car Thing. Open a terminal and run the following command: `curl -fsSL https://terbium.app/install-rules | bash`
9.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
10.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
11.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
12.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
13.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**

---

<a id="https-carthing-wiki-first-steps-flashing"></a>

## https://carthing.wiki/first-steps/flashing

| Source | `https://carthing.wiki/first-steps/flashing` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/first-steps/flashing/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/first-steps/flashing/#_top)
    * [ Flashing with Terbium on Windows ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-windows)
    * [ Flashing with Terbium on Mac ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-mac)
    * [ Flashing with Terbium on Linux ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-linux)


## On this page
  * [ Overview ](https://carthing.wiki/first-steps/flashing/#_top)
    * [ Flashing with Terbium on Windows ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-windows)
    * [ Flashing with Terbium on Mac ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-mac)
    * [ Flashing with Terbium on Linux ](https://carthing.wiki/first-steps/flashing/#flashing-with-terbium-on-linux)


# Flashing the Car Thing
This page provides step-by-step instructions for flashing the Spotify Car Thing with the Thing Labs OS using the Terbium webpage. Prefer video guides? See the 
![The Terbium home screen](https://carthing.wiki/_astro/terbium-restore-local.kWUo4ngF_Z2oHYQd.webp)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-3)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-4)
  * [ ](https://carthing.wiki/first-steps/flashing/#tab-panel-5)


### Flashing with Terbium on Windows
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Flashing the Car Thing from Windows USB drivers to be installed. From Windows PowerShell, send the following command:

```

irm https://driver.terbium.app/get | iex

```

Having problems with the script? The Zadig application can also be used to load the WinUSB driver, see [Legacy - Setting Up](https://carthing.wiki/legacy/setup-env). 
7.) Select the **Done** button.
8.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
9.) Select the device, then **Connect**.
If the system has been used to flash Car Thing previously using a legacy method, an “Access Denied” error may appear. This is the result of incorrect drivers being installed. To remove old drivers, open Windows Device Manager and look for either “GX-CHIP” or “WorldCup” in the list of devices. If one of these devices is found, right click and select **Uninstall device**. Next, select **Attempt to remove the driver for this device**. Finally, select **Uninstall**. This may need to be performed multiple times to ensure all previous drivers are removed. If the GX-CHIP device shows a warning symbol, install the driver again with the command in the described in step 6. 
10.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
11.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
12.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
13.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
14.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**
### Flashing with Terbium on Mac
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Select the **Done** button.
7.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
8.) Select the device, then **Connect**.
9.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
10.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
11.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
12.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
13.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**
### Flashing with Terbium on Linux
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the zip into an accessible location.
3.) Navigate to 
4.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing power supply USB-C port.
5.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burn mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure the USB port power supply and cable are capable of passing data and providing ample power to the car thing. 
6.) Select the **Done** button.
7.) A popup should appear in the browser with a device listed as “GX-CHIP”.
If no device is identified make sure the Car Thing is in USB burn mode, see step 5. 
8.) Select the device, then **Connect**. you may need to setup udev rules to allow access to the Car Thing. Open a terminal and run the following command:
It may be necessary to setup udev rules to allow access to the Car Thing. Open a terminal and run the following command: `curl -fsSL https://terbium.app/install-rules | bash`
9.) The USB device will briefly reconnect, putting the device into burn mode. Select **Connect** again.
10.) A popup should appear in the browser with the device now listed as “unknown device from Amlogic, Inc”. Select the device, then **Connect**.
11.) Once connected, select the button **Restore Local Folder** , navigate to the thingify.tools extracted zip directory, and select **Open**.
12.) A popup should appear in the browser requesting access to view the directory. Give permission to the browser by selecting **View files**.
13.) Select the **Select** button to start the flashing process.
Press **F12** on a keyboard to view the flashing logs. If an error occurs while attempting to flash, review the logs and provide them in a support thread on the 
**Congratulations! Your Car Thing is now flashed and ready to use with a Thing Labs or Community app.**

---

<a id="https-carthing-wiki-legacy-setup-env"></a>

## https://carthing.wiki/legacy/setup-env

| Source | `https://carthing.wiki/legacy/setup-env` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/legacy/setup-env/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/setup-env/#_top)
  * [ Installing Prerequisite Programs ](https://carthing.wiki/legacy/setup-env/#installing-prerequisite-programs)
    * [ Git ](https://carthing.wiki/legacy/setup-env/#git)
    * [ Python ](https://carthing.wiki/legacy/setup-env/#python)
    * [ Drivers ](https://carthing.wiki/legacy/setup-env/#drivers)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/setup-env/#_top)
  * [ Installing Prerequisite Programs ](https://carthing.wiki/legacy/setup-env/#installing-prerequisite-programs)
    * [ Git ](https://carthing.wiki/legacy/setup-env/#git)
    * [ Python ](https://carthing.wiki/legacy/setup-env/#python)
    * [ Drivers ](https://carthing.wiki/legacy/setup-env/#drivers)


# Setting up your system
This page provides step-by-step instructions to set up your system for flashing your Car Thing using a legacy flashing method, from tool preparation to software configuration for a successful flashing process.
## Installing Prerequisite Programs
Flashing the CarThing requires additional programs and drivers.
### Git
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-12)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-13)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-14)


Install Git on your system 
Install Git on your system using the commad ‘git —versions’
Install Git on your system using the command ‘sudo apt install git’
### Python
Python is required to run the Car Thing flasher program (superbird).
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-15)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-16)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-17)


Python no longer needs to be manually installed for the latest Windows flashing process!
Install 
Homebrew is necessary because the macOS default python installation isn’t compatible with the installer.
Run the following command:
Terminal window
```


sudo apt-ghet install python3


```

### Drivers
To connect to the Car Thing, it is necessary to install specific drivers that are compatible with the device.
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-18)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-19)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-20)


Complete the following steps to connect the Car Thing to your computer and install the proper USB Drivers.
1.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing Power Supply Port.
2.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burning mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure your USB power supply and cable are capable of passing data and providing ample power to the car thing. 
3.) Install Zadig from 
4.) After the driver is installed select options, then “list all devices”.
![A reference image of the zadig options.](https://carthing.wiki/_astro/zadig_ignore.DTshDxVm_Z1woMOU.webp)
5.) Within the drop-down change the select “GX-CHIP”. Select the “Edit” checkbox and replace the name with “WorldCup Device”.
This name is case sensitive! 
6.) In the “Driver” field select the up or down arrows to cycle through the list of drivers. Press the up arrow until you see the option “libusbK”.
7.) Select “Replace Driver” and wait for it to finish. This can take several minutes.
![A reference image of the zadig usb drivers.](https://carthing.wiki/_astro/zadig_libusbk.BhLq7kL7_1OCneL.webp) If this driver does not work, try using the WinUSB driver instead. 
To verify the driver has changed successfully, navigate to the windows device manager. You should find a drop down titled “libuse-win32 devices” and a device named “WorldCup Device”
![A reference image of the device manager device.](https://carthing.wiki/_astro/device-manager.LPzPATzP_2dXGXw.webp) Still having problems? Try uninstalling the driver within Device Manager and then power cycling the car thing. 
Terminal window
```


brew install libusb


```

With your package manager of choice install the packages
Terminal window
```


libusb libusb-compat


```

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-mediawin"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/#_top)


# Mediawin App
A simple app that adds support for more windows media playback data. To install it, simply download the application from the **Downloads** tab in the DeskThing Server, see [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
You can change your Car Thing playback sources under **Settings** in the **Music** tab.
![An example of the spotify app](https://carthing.wiki/_astro/DeskThing_Music.CVe5hlqB_ZLf5iv.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-utility"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/#_top)


# Utility App
We don’t like this app around these parts. Functionality was integrated into the base app in v0.9.0.
Please purge this app from your DeskThing Server install under the app settings, actions tab. See [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-weather"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/#_top)


# Weather App
![An example of the weather app](https://carthing.wiki/_astro/Weather_App.BUKr0Wfi_xpbeO.webp)
A simple display for your local weather. To install it, simply download the application from the **Downloads** tab in the DeskThing Server, see [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
Adjust the units and location in the app settings.
![An example of the weather app settings](https://carthing.wiki/_astro/Weather_Settings.Gb6e0eje_21qKyO.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-spotify"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#_top)
  * [ Setup ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#setup)
    * [ Spotify Developer App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#spotify-developer-app)
    * [ Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#configuration)
    * [ Navigation and Control ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#navigation-and-control)
    * [ App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#app-settings)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#_top)
  * [ Setup ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#setup)
    * [ Spotify Developer App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#spotify-developer-app)
    * [ Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#configuration)
    * [ Navigation and Control ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#navigation-and-control)
    * [ App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/#app-settings)


# Spotify App
![An example of the spotify app](https://carthing.wiki/_astro/DeskThing_SpotifyApp.DPUL_ZKL_Z1rPEAd.webp)
The Spotify DeskThing app is an integration with the Spotify API that enables the following:
  * Show information for the Spotify music and podcasts that is actively playing including Album, Artist, Song Name, and Album Art.
  * Control Spotify with onscreen buttons including play, pause, skip, rewind, shuffle, and repeat.
  * Set and navigate to your favorite playlists and add songs.
  * Set the audio output source


## Setup
Complete the following steps to setup the Spotify DeskThing app.
### Spotify Developer App
For the Spotify DeskThing app to receive realtime updates about your Spotify playback you need a Client ID and Client Secret.
1.) Navigate to 
2.) Select the **Create App** button.
3.) Enter an app name and description. This can be anything.
4.) In the Redirect URI’s entry box, enter “deskthing://a?app=spotify” and hit **add**.
5.) Check the box for the Spotify developer agreement policy.
6.) Select **Save**.
![An example of creating spotify developer app](https://carthing.wiki/_astro/Spotify_Dev_App.DzNlfecT_23x1BR.webp)
_note: The redirect URL is wrong in this image. It should be “deskthing://a?app=spotify” due to recent spotify API changes._
7.) Once created, click on the app and then settings.
8.) In the settings page, copy the **Client ID** and **Client Secret** and save them somewhere easily accessible.
### Configuration
After acquiring a **Client ID** and **Client Secret** , proceed with setting up the Spotify DeskThing App.
1.) In the DeskThing Desktop Client, navigate to the **Downloads** tab.
![An example of creating spotify developer app](https://carthing.wiki/_astro/DeskThing_Downloads.BcC4x3vy_ZzpAtO.webp)
2.) Scroll down, locate the Spotify App, and select the download button.
3.) Select to **Notifications** in the bottom left corner, and then navigate to the **Request** tab. This request can also be seen from the **Apps** tab.
4.) A new popup window should appear. Select **Initialize App** to complete the install process.
5.) Within the **Request** tab an app request for the Spotify app should be present. Enter the **Client ID** and **Client Secret** acquired earlier and select the submit check button in the bottom right corner. Leave the **Redirect URL** at the default value unless you have reason to change it. After submitting, a new window should open in your web browser with a success message.
![An example of the DeskThing Spotify app request](https://carthing.wiki/_astro/Spotify_Request.C5zKF6e7_14Clpt.webp)
_Note: the redirect url should be “deskthing://a?app=spotify” instead of localhost due to recent spotify API changes_
6.) Navigate to **Settings**.
![An example of navigating to the DeskThing settings](https://carthing.wiki/_astro/DeskThing_Settings.Bj0xaGtZ_vDTOL.webp)
7.) Under the **Music** tab, select the drop down for playback sources, select **Spotify App** , and select **Save**.
![An example of the DeskThing music settings](https://carthing.wiki/_astro/DeskThing_Music.CVe5hlqB_ZLf5iv.webp)
### Navigation and Control
The spotify app has a few navigation and control options to better manage your music.
**Turning CarThing Dial** - Turns up and down the Spotify service volume. This does not impact system volume.
**Pressing CarThing Dial** - Pause/Play Spotify.
**Left-hand Screen Tap** - Tapping the left hand side of the screen displays a flyout menu with music information.
**Right-hand Screen Tap** - Tapping the right hand side of the screen displays four playlist options. See Playlist Management for configuration.
#### Playlist Management
Playlists can be added and managed in DeskThing Spotify App. Tap the right hand side of the screen to bring up the playlist menu.
![An example of the Spotify App Playlist flyout menu](https://carthing.wiki/_astro/DeskThing_SpotifyPlaylists.A-iaccgu_ZlADyj.webp)
Tap the playlist button and tap the right arrow to cycle through the following options:
**Play Playlist** - Plays the configured playlist shortcut.
**Add Song** - Adds the currently playing song to the active playlist.
**Set Playlist** - Sets the playlist shortcut to the currently active song playlist.
### App Settings
**Switch Output on Select** - This enable option will automatically switch the output device when the source is selected.
**Output Device** - This settings allows you to set the output device of the Spotify audio.
![An example of the Spotify App settings](https://carthing.wiki/_astro/Spotify_AppSettings.BWjFUxtU_28WMcF.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-system"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/system/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/system/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/#_top)


# System App
![An example of the system app](https://carthing.wiki/_astro/System_App.j1cMAj_q_Z2tYlIt.webp)
A simple display your system resources. To install it, simply download the application from the **Downloads** tab in the DeskThing Server, see [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
Note: This was removed in v0.10 and will only be added if voted on the community

---

<a id="https-carthing-wiki-troubleshooting-faq"></a>

## https://carthing.wiki/troubleshooting/faq

| Source | `https://carthing.wiki/troubleshooting/faq` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/troubleshooting/faq/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/troubleshooting/faq/#_top)
  * [ Known Issues ](https://carthing.wiki/troubleshooting/faq/#known-issues)
    * [ AMD 5000 series cards ](https://carthing.wiki/troubleshooting/faq/#amd-5000-series-cards)
    * [ Bulkmode Failed while Flashing ](https://carthing.wiki/troubleshooting/faq/#bulkmode-failed-while-flashing)
    * [ Car Thing flashes successfully but doesn’t get detected ](https://carthing.wiki/troubleshooting/faq/#car-thing-flashes-successfully-but-doesnt-get-detected)


## On this page
  * [ Overview ](https://carthing.wiki/troubleshooting/faq/#_top)
  * [ Known Issues ](https://carthing.wiki/troubleshooting/faq/#known-issues)
    * [ AMD 5000 series cards ](https://carthing.wiki/troubleshooting/faq/#amd-5000-series-cards)
    * [ Bulkmode Failed while Flashing ](https://carthing.wiki/troubleshooting/faq/#bulkmode-failed-while-flashing)
    * [ Car Thing flashes successfully but doesn’t get detected ](https://carthing.wiki/troubleshooting/faq/#car-thing-flashes-successfully-but-doesnt-get-detected)


# Frequently Asked Questions
This page is full of commonly asked general questions about Car Thing and flashing.
## Known Issues
### AMD 5000 series cards
For whatever reason AMD hasn’t fixed their USB issue. A few people have had luck with a BIOS update - but the easiest way is to just set it up with another computer
Symptoms are usually read-only mode, boot looping, Unknown Device in device manager, or just generally funky stuff
solution legit just try another computer - I’m sorry. I really dont know a better alternative at this time
### Bulkmode Failed while Flashing
Things to change to make it more likely to work:
  * Use a externally powered USB hub.
  * Use high quality USB-C cables.
  * Try both a USB A-to-C and C-to-C cable.
  * Directly connect to your motherboard USB ports.
  * Try another computer.
  * Disconnect unnecessary USB devices.
  * Try a legacy flashing method.
  * Attempt the flashing process again!


### Car Thing flashes successfully but doesn’t get detected
The car thing is on the “Welcome to spotify” screen after flashing but not showing up in DeskThing.
  * Always default to trying a new port (preferably one on the back of your PC) or a new cable!
  * Try opening Device Manager and seeing if adb interface shows up (near the bottom). If it does, continue.
  * If there is an Unknown Device - try a new port/cable or flashing again

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-introduction"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/introduction

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/introduction` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * [ Terminology ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#terminology)
  * [ Setting Up ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#setting-up)
  * [ Useful Links ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#useful-links)
    * [ Documentation ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#documentation)
    * [ Social ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#social)
    * [ Development ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#development)
    * [ Other Guides: ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#other-guides)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * [ Terminology ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#terminology)
  * [ Setting Up ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#setting-up)
  * [ Useful Links ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#useful-links)
    * [ Documentation ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#documentation)
    * [ Social ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#social)
    * [ Development ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#development)
    * [ Other Guides: ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#other-guides)


# Introduction
![The DeskThing Banner](https://carthing.wiki/_astro/DeskThing_Banner.DG6AY9b4_2QBpk.webp)
Credit for the photo: 
![A nice B-role shot from Dammit Jeff](https://carthing.wiki/_astro/DeskThing_Photo.5zXvYNQw_Z2lAkr3.webp)
DeskThing is an application that serves a control interface to a Car Thing, phone, or any other computing device. It also can load official and community-developed apps to allow control over local audio, monitor discord, or even keep an eye on the weather!
## Terminology
Keep these terms in mind when reading the documentation.
**DeskThing Client** - The image displayed on the Car Thing or other device.
**DeskThing Server** - The application installed on a computer to interface with the client.
**DeskThing Apps** - Standalone applications installed to extend the functionality of DeskThing Server.
## Setting Up
Follow through the following instructions in order to setup the Car Thing with DeskThing.
1.) [Flashing The Car Thing](https://carthing.wiki/first-steps/flashing/).
2.) [Setup DeskThing Server](https://carthing.wiki/thinglabs-apps/deskthing/server-config).
3.) [Install Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
## Useful Links
### Documentation
  * Official Website: 
  * Github: 
  * Flashing Tool: 


### Social
  * Discord: 
  * Reddit: 
  * Youtube: 
  * Twitter/X: 


### Development
  * Trello: 
  * Donate: 


### Other Guides:
  * iFixit Flashing Guide:

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-weatherwave"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/#_top)


# Weatherwave App
![An example of the weatherwave app](https://carthing.wiki/_astro/Weatherwave_App.tkKeljA2_2CKXD.webp)
Developed by Dammit Jeff in conjunction with RipRod, Weatherwave is an attractive weather, clock, and spotify display. To install it, simply download the application from the **Downloads** tab in the DeskThing Server, see [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
Adjust the units and location in the app settings.
![An example of the weatherwave app settings](https://carthing.wiki/_astro/Weather_Settings.Gb6e0eje_21qKyO.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-server-config"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/server-config

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/server-config` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * [ Installation and Setup ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#installation-and-setup)
  * [ Windows - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#windows---suggested-settings-changes)
  * [ Mac - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#mac---suggested-settings-changes)
  * [ Linux - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#linux---suggested-settings-changes)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * [ Installation and Setup ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#installation-and-setup)
  * [ Windows - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#windows---suggested-settings-changes)
  * [ Mac - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#mac---suggested-settings-changes)
  * [ Linux - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#linux---suggested-settings-changes)


# Server Configuration
The DeskThing Server application is your interface for managing DeskThing and its clients. This section describes how to install the app and configure its settings.
DeskThing supports the following platforms:
  * **Windows 10/11**
  * **Linux x64/x86**
  * **Linux ARM (Coming Soon)**
  * **Mac with ARM Processors**
  * **Mac with Intel Processors**


## Installation and Setup
Complete the following steps to connect your Car Thing to the DeskThing Desktop server. Prefer video guides? See the 
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-0)
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-1)
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-2)


1.) Download the DeskThing desktop server installer from 
2.) Run deskthing-win-x.x.x-setup.exe.
3.) After running, the app should open.
4.) Navigate to **Clients**.
![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select **Skip Setup** to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration.
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Windows - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)
1.) Download the DeskThing desktop server installer from 
2.) Install deskthing-mac-arm64-x.x.x-setup.dmg for Apple Silcon Devices or deskthing-mac-x64-x.x.x-setup.dmg for intel devices.
3.) After installing, open the app.
4.) Navigate to **Clients**.
![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select *Skip Setup” to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration (More Description of config options coming soon).
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Mac - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)
1.) Download the DeskThing desktop server installer from 
2.) Install deskthing-linux-x.x.x-setup.AppImage.
3.) After installing, open the app.
4.) Navigate to **Clients**.
!![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select *Skip Setup” to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration (More Description of config options coming soon).
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Linux - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)

---

<a id="https-carthing-wiki-legacy-adb"></a>

## https://carthing.wiki/legacy/adb

| Source | `https://carthing.wiki/legacy/adb` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/legacy/adb/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/adb/#_top)
  * [ Android Debug Bridge (ADB) ](https://carthing.wiki/legacy/adb/#android-debug-bridge-adb)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/adb/#_top)
  * [ Android Debug Bridge (ADB) ](https://carthing.wiki/legacy/adb/#android-debug-bridge-adb)


# ADB
## Android Debug Bridge (ADB)
Download and setup ADB to allow communications between a PC and the Car Thing.
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-6)
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-7)
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-8)


Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Windows** and accept the terms and conditions.
3.) Extract the the file “platform-tools-latest-windows.zip” and navigate to ”..\platform-tools-latest-windows\platform-tools\adb.exe”
4.) Within Windows, navigate to “Edit the system environment variables”.
5.) Under **System Properties** within the **Advanced** tab, select **Environment Variables**.
6.) Under the **System Variables** window locate the variable **Path** and select **Edit**.
7.) On the right-hand side of the window **Edit environment variables** select **New** and a new row will be highlighted.
8.) Enter the file path of the folder **platform-tools**.
The file path can easily be obtained by holding the shift key, right-clicking the folder, and selecting, **copy as path**. 
9.) Select **ok** to save the path.
10.) Verify that the tool is working properly by opening Windows PowerShell and entering “adb devices”. A device should now be listed.
A known issue has been identified regarding compatibility with the adb tool and AMD 5000 series CPUs. AMD has been notified and possibly working on a fix. If you run into this issue, try updating the pc BIOS. 
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Mac** and accept the terms and conditions.
…Additional Steps Coming Soon :(
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Linux** and accept the terms and conditions.
…Additional Steps Coming Soon :(

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-apps-vinyl-player"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/#_top)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/#_top)


# Vinyl Player App
![An example of the vinyl player app](https://carthing.wiki/_astro/Record_App.CKRNGiJX_Zl17Sc.webp)
A Car Thing retro resign that makes your music playback look like a spinning record! To install it, simply download the application from the **Downloads** tab in the DeskThing Server, see [Managing Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).

---

<a id="https-carthing-wiki-legacy-alternative-flashing"></a>

## https://carthing.wiki/legacy/alternative-flashing

| Source | `https://carthing.wiki/legacy/alternative-flashing` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * [ Flashing Tools ](https://carthing.wiki/legacy/alternative-flashing/#flashing-tools)
    * [ Bundled Installer Tool ](https://carthing.wiki/legacy/alternative-flashing/#bundled-installer-tool)
    * [ SuperBird Tool for Mac ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-mac)
    * [ SuperBird Tool for Linux ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-linux)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * [ Flashing Tools ](https://carthing.wiki/legacy/alternative-flashing/#flashing-tools)
    * [ Bundled Installer Tool ](https://carthing.wiki/legacy/alternative-flashing/#bundled-installer-tool)
    * [ SuperBird Tool for Mac ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-mac)
    * [ SuperBird Tool for Linux ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-linux)


# Legacy Flashing Methods
This page provides step-by-step instructions for legacy flashing methods for your Car Thing. It is recommended to use the steps in the section [Flashing Your Car Thing](https://carthing.wiki/first-steps/flashing). Only proceed with these flashing methods neccessary. Ensure you have completed the steps outlined in [Setting Up](https://carthing.wiki/first-steps/setup-env) before proceeding.
## Flashing Tools
Flash your car thing has a different process for Windows then for Mac and Linux. For the easiest flashing process, use a Windows device
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-9)
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-10)
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-11)


### Bundled Installer Tool
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the windows-bundled.zip into an accessible location and navigate to the extracted directory.
3.) Within the directory, double click the “flash.bat” file.
Make sure you can view file name extensions enabled with the Windows File Explorer. 
4.) Wait for the flashing process to complete. If the installation fails with an error message stating “device not found”, power cycle the device, enter back into USB burn mode, and try again. 
You may notice that the data and setting file fail. These files are unnecessary and will not impact the flashing process.  A known issue has been identified regarding compatibility with the flashing tool and AMD 5000 series CPUs. AMD has been notified and possibly working on a fix. If you run into this issue, try updating your BIOS or try the flashing process a few times. 
5.) After the flashing process completes, power cycle the car thing.
### SuperBird Tool for Mac
1.) Execute the following command to ensure the device can be found.
Terminal window
```


python3 -m pip install git+https://github.com/pyusb/pyusb




python3 -m pip install git+https://github.com/superna9999/pyamlboot




python3 superbird_tool.py --find_device


```

2.) Execute the following command to enter USB Burn Mode.
Terminal window
```


python superbird_tool.py --burn_mode


```

3.) Execute the following command to flash the device.
Terminal window
```


sudo xattr -r -d com.apple.quarantine DeskThing.app




chmod +x /Applications/DeskThing.app/Contents/Resources/mac/adb



deskthing-0..--setup

```

Additonal Steps Coming Soon!
### SuperBird Tool for Linux
1.) Execute the following command to ensure the device can be found.
Terminal window
```


sudo python3 -m pip install git+https://github.com/superna9999/pyamlboot




sudo ./superbird_tool.py --find_device


```

2.) Execute the following command to enter USB Burn Mode.
Terminal window
```


python superbird_tool.py --burn_mode


```

3.) Execute the following command to flash the device.
Terminal window
```

deskthing-0..--setup

```

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-managing-apps"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/managing-apps

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/managing-apps` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * [ Adding Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#adding-apps)
    * [ Community Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#community-apps)
  * [ Managing Installed Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#managing-installed-apps)
    * [ Modifying App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#modifying-app-settings)
    * [ Disabling, Stopping, and Deleting Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#disabling-stopping-and-deleting-apps)
    * [ Locating App Version Info ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#locating-app-version-info)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * [ Adding Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#adding-apps)
    * [ Community Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#community-apps)
  * [ Managing Installed Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#managing-installed-apps)
    * [ Modifying App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#modifying-app-settings)
    * [ Disabling, Stopping, and Deleting Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#disabling-stopping-and-deleting-apps)
    * [ Locating App Version Info ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#locating-app-version-info)


# Managing Apps
DeskThing Server can load official or community apps to extend its functionality. This section explains how to install and manage DeskThing apps. See the individual app sections for specific app details.
## Adding Apps
Official apps have been developed by RipRod or the Thing Labs team. Official apps can be installed using the following steps:
1.) Within DeskThing Server, proceed to the **Downloads** Tab.
![Highlights how to navigate to the downloads tab](https://carthing.wiki/_astro/DeskThing_Downloads.BcC4x3vy_ZzpAtO.webp)
2.) Select the **Download Latest** button to download the app. A new window should appear requesting to initialize the app. Older versions of the apps can be found by selecting the “More Downloads” button.
3.) A new popup window should appear. Select **Initialize App** to complete the install process.
4.) Navigate to the apps to see the list of downloaded apps. Some apps may display requests or have additional settings options.
![Highlights the Apps tab.](https://carthing.wiki/_astro/DeskThing_Apps.eRuWWGzW_KK5bH.webp)
### Community Apps
Communitity apps are unofficial projects. Find the full list of recognized community apps at 
Community apps can be installed using the **Upload App** button under the **Downloads** tab.
![Highlights how to upload a community app.](https://carthing.wiki/_astro/DeskThing_UploadApp.DUCu6YIb_ZClVTF.webp)
## Managing Installed Apps
Select the **Apps** tab and select the **Settings** button to manage the installed apps. See the individual app sections for specific app details.
![Highlights how to access app settings menus.](https://carthing.wiki/_astro/DeskThing_AppSettingsMenu.OHEKIfEP_ZIYMOt.webp)
### Modifying App Settings
The **Settings** tab display app settings.
![Shows an example of an apps settings options](https://carthing.wiki/_astro/DeskThing_AppSettings.Cu-Te1E5_Z2vjzz8.webp)
### Disabling, Stopping, and Deleting Apps
Definitions:
**Purge** - Delete the app from DeskThing Server
**Disable** - Stop the app until re-enabled, this is persistent.
**Stop** - Stops the app until DeskThing Server is restarted.
Under the **Actions** tab, select the desired action.
![Shows an example of an apps action tab](https://carthing.wiki/_astro/DeskThing_AppActions.BsApqJyG_Z1ln4FC.webp)
### Locating App Version Info
Find useful app info under the **Details** tab.
![Shows an example of an apps details tab](https://carthing.wiki/_astro/DeskThing_AppDetails.D8ujZ2DJ_2K0m1.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-faq"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/faq

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/faq` |
|---|---|
| Depth | 1 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * [ Q/A ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#qa)
    * [ How do I setup Spotify? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-setup-spotify)
    * [ How do I enable RNDIS? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-enable-rndis)
    * [ How do I change the Car Things backlight brightness? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-change-the-car-things-backlight-brightness)
    * [ How do I use DeskThing on my phone? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-use-deskthing-on-my-phone)
  * [ Known Issues ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#known-issues)
    * [ App Local Not Found (is it running?) ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#app-local-not-found-is-it-running)
    * [ Car Thing connects successfully but cannot play audio. ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#car-thing-connects-successfully-but-cannot-play-audio)
    * [ Getting Audio Data / Waiting For Song ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#getting-audio-data--waiting-for-song)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * [ Q/A ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#qa)
    * [ How do I setup Spotify? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-setup-spotify)
    * [ How do I enable RNDIS? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-enable-rndis)
    * [ How do I change the Car Things backlight brightness? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-change-the-car-things-backlight-brightness)
    * [ How do I use DeskThing on my phone? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-use-deskthing-on-my-phone)
  * [ Known Issues ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#known-issues)
    * [ App Local Not Found (is it running?) ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#app-local-not-found-is-it-running)
    * [ Car Thing connects successfully but cannot play audio. ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#car-thing-connects-successfully-but-cannot-play-audio)
    * [ Getting Audio Data / Waiting For Song ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#getting-audio-data--waiting-for-song)


# Frequently Asked Questions
This page is full of commonly asked questions about DeskThing.
## Q/A
### How do I setup Spotify?
Take a look at the [Spotify App](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/) section.
### How do I enable RNDIS?
1.) Navigate to “Settings” and select the “Client” tab.
2.) Enable “Use RNDIS”.
3.) Navigate to the “Device” tab.
4.) Select the play button “Run FireWall Configuration”
If it says it failed to verify Firewall. That is OK, continue with the process.  5.) 5.) Exit the “Settings” window and select “Device Details” under the “Clients > Connections” tab.![A reference image of the device details.](https://carthing.wiki/_astro/DeskThing_Device_Details.6YQADas-_1qsru6.webp)
6.) Select the “Push Staged” button.
### How do I change the Car Things backlight brightness?
1.) Under the “Clients” tab, select “Device Details”.
![A reference image navigating to device details.](https://carthing.wiki/_astro/DeskThing_Device_Details.6YQADas-_1qsru6.webp)
2.) Scroll down, locate “backlight: RUNNING”, and select the pause icon.
![A reference image of the pausing the backlight service.](https://carthing.wiki/_astro/DeskThing_Supervisor_Pause_Backlight.BKE_caFZ_2bIWBX.webp)
3.) Using the slidebar labeled “brightness”, move the slider left or right to change the car thing display brightneses.
![A reference image of the device details.](https://carthing.wiki/_astro/DeskThing_Device_Brightness.0hNdQs8R_Z2sbuet.webp) The backlight process starts whenever the device powers on. The backlight process must be manually stopped every time the car thing is power cycled. 
### How do I use DeskThing on my phone?
1.) Download the DeskThing desktop server installer from 
2.) Run deskthing-win-x.x.x-setup.exe.
3.) After running, the app should open.
4.) Navigate to “Clients”.
![A reference image of the deskthing clients.](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) Select “QR Code” and scan the QR Code with your phone.
![A reference image of the deskthing client QR code.](https://carthing.wiki/_astro/DeskThing_QR.CWXVOQh0_1l44Pb.webp)
## Known Issues
### App Local Not Found (is it running?)
Please remove the utility app.
We don’t like that app around these parts. The functionality was integrated into the base app in v0.9.0.
### Car Thing connects successfully but cannot play audio.
Navigate to settings (bottom left), set a playback location under the **Music** tab, and select save.
###  **Getting Audio Data** / **Waiting For Song**
Make sure you have audio playing and hit **Play** or **Skip**

---

<a id="https-carthing-wiki-first-steps-setup-env"></a>

## https://carthing.wiki/first-steps/setup-env

| Source | `https://carthing.wiki/first-steps/setup-env` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/first-steps/setup-env#_top)
# 404
Page not found. Check the URL or try using the search bar.

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-faq"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/faq/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/faq/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * [ Q/A ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#qa)
    * [ How do I setup Spotify? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-setup-spotify)
    * [ How do I enable RNDIS? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-enable-rndis)
    * [ How do I change the Car Things backlight brightness? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-change-the-car-things-backlight-brightness)
    * [ How do I use DeskThing on my phone? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-use-deskthing-on-my-phone)
  * [ Known Issues ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#known-issues)
    * [ App Local Not Found (is it running?) ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#app-local-not-found-is-it-running)
    * [ Car Thing connects successfully but cannot play audio. ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#car-thing-connects-successfully-but-cannot-play-audio)
    * [ Getting Audio Data / Waiting For Song ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#getting-audio-data--waiting-for-song)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#_top)
  * [ Q/A ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#qa)
    * [ How do I setup Spotify? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-setup-spotify)
    * [ How do I enable RNDIS? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-enable-rndis)
    * [ How do I change the Car Things backlight brightness? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-change-the-car-things-backlight-brightness)
    * [ How do I use DeskThing on my phone? ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#how-do-i-use-deskthing-on-my-phone)
  * [ Known Issues ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#known-issues)
    * [ App Local Not Found (is it running?) ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#app-local-not-found-is-it-running)
    * [ Car Thing connects successfully but cannot play audio. ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#car-thing-connects-successfully-but-cannot-play-audio)
    * [ Getting Audio Data / Waiting For Song ](https://carthing.wiki/thinglabs-apps/deskthing/faq/#getting-audio-data--waiting-for-song)


# Frequently Asked Questions
This page is full of commonly asked questions about DeskThing.
## Q/A
### How do I setup Spotify?
Take a look at the [Spotify App](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/) section.
### How do I enable RNDIS?
1.) Navigate to “Settings” and select the “Client” tab.
2.) Enable “Use RNDIS”.
3.) Navigate to the “Device” tab.
4.) Select the play button “Run FireWall Configuration”
If it says it failed to verify Firewall. That is OK, continue with the process.  5.) 5.) Exit the “Settings” window and select “Device Details” under the “Clients > Connections” tab.![A reference image of the device details.](https://carthing.wiki/_astro/DeskThing_Device_Details.6YQADas-_1qsru6.webp)
6.) Select the “Push Staged” button.
### How do I change the Car Things backlight brightness?
1.) Under the “Clients” tab, select “Device Details”.
![A reference image navigating to device details.](https://carthing.wiki/_astro/DeskThing_Device_Details.6YQADas-_1qsru6.webp)
2.) Scroll down, locate “backlight: RUNNING”, and select the pause icon.
![A reference image of the pausing the backlight service.](https://carthing.wiki/_astro/DeskThing_Supervisor_Pause_Backlight.BKE_caFZ_2bIWBX.webp)
3.) Using the slidebar labeled “brightness”, move the slider left or right to change the car thing display brightneses.
![A reference image of the device details.](https://carthing.wiki/_astro/DeskThing_Device_Brightness.0hNdQs8R_Z2sbuet.webp) The backlight process starts whenever the device powers on. The backlight process must be manually stopped every time the car thing is power cycled. 
### How do I use DeskThing on my phone?
1.) Download the DeskThing desktop server installer from 
2.) Run deskthing-win-x.x.x-setup.exe.
3.) After running, the app should open.
4.) Navigate to “Clients”.
![A reference image of the deskthing clients.](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) Select “QR Code” and scan the QR Code with your phone.
![A reference image of the deskthing client QR code.](https://carthing.wiki/_astro/DeskThing_QR.CWXVOQh0_1l44Pb.webp)
## Known Issues
### App Local Not Found (is it running?)
Please remove the utility app.
We don’t like that app around these parts. The functionality was integrated into the base app in v0.9.0.
### Car Thing connects successfully but cannot play audio.
Navigate to settings (bottom left), set a playback location under the **Music** tab, and select save.
###  **Getting Audio Data** / **Waiting For Song**
Make sure you have audio playing and hit **Play** or **Skip**

---

<a id="https-carthing-wiki-troubleshooting-faq"></a>

## https://carthing.wiki/troubleshooting/faq/

| Source | `https://carthing.wiki/troubleshooting/faq/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/troubleshooting/faq/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/troubleshooting/faq/#_top)
  * [ Known Issues ](https://carthing.wiki/troubleshooting/faq/#known-issues)
    * [ AMD 5000 series cards ](https://carthing.wiki/troubleshooting/faq/#amd-5000-series-cards)
    * [ Bulkmode Failed while Flashing ](https://carthing.wiki/troubleshooting/faq/#bulkmode-failed-while-flashing)
    * [ Car Thing flashes successfully but doesn’t get detected ](https://carthing.wiki/troubleshooting/faq/#car-thing-flashes-successfully-but-doesnt-get-detected)


## On this page
  * [ Overview ](https://carthing.wiki/troubleshooting/faq/#_top)
  * [ Known Issues ](https://carthing.wiki/troubleshooting/faq/#known-issues)
    * [ AMD 5000 series cards ](https://carthing.wiki/troubleshooting/faq/#amd-5000-series-cards)
    * [ Bulkmode Failed while Flashing ](https://carthing.wiki/troubleshooting/faq/#bulkmode-failed-while-flashing)
    * [ Car Thing flashes successfully but doesn’t get detected ](https://carthing.wiki/troubleshooting/faq/#car-thing-flashes-successfully-but-doesnt-get-detected)


# Frequently Asked Questions
This page is full of commonly asked general questions about Car Thing and flashing.
## Known Issues
### AMD 5000 series cards
For whatever reason AMD hasn’t fixed their USB issue. A few people have had luck with a BIOS update - but the easiest way is to just set it up with another computer
Symptoms are usually read-only mode, boot looping, Unknown Device in device manager, or just generally funky stuff
solution legit just try another computer - I’m sorry. I really dont know a better alternative at this time
### Bulkmode Failed while Flashing
Things to change to make it more likely to work:
  * Use a externally powered USB hub.
  * Use high quality USB-C cables.
  * Try both a USB A-to-C and C-to-C cable.
  * Directly connect to your motherboard USB ports.
  * Try another computer.
  * Disconnect unnecessary USB devices.
  * Try a legacy flashing method.
  * Attempt the flashing process again!


### Car Thing flashes successfully but doesn’t get detected
The car thing is on the “Welcome to spotify” screen after flashing but not showing up in DeskThing.
  * Always default to trying a new port (preferably one on the back of your PC) or a new cable!
  * Try opening Device Manager and seeing if adb interface shows up (near the bottom). If it does, continue.
  * If there is an Unknown Device - try a new port/cable or flashing again

---

<a id="https-carthing-wiki-legacy-alternative-flashing"></a>

## https://carthing.wiki/legacy/alternative-flashing/

| Source | `https://carthing.wiki/legacy/alternative-flashing/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * [ Flashing Tools ](https://carthing.wiki/legacy/alternative-flashing/#flashing-tools)
    * [ Bundled Installer Tool ](https://carthing.wiki/legacy/alternative-flashing/#bundled-installer-tool)
    * [ SuperBird Tool for Mac ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-mac)
    * [ SuperBird Tool for Linux ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-linux)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/alternative-flashing/#_top)
  * [ Flashing Tools ](https://carthing.wiki/legacy/alternative-flashing/#flashing-tools)
    * [ Bundled Installer Tool ](https://carthing.wiki/legacy/alternative-flashing/#bundled-installer-tool)
    * [ SuperBird Tool for Mac ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-mac)
    * [ SuperBird Tool for Linux ](https://carthing.wiki/legacy/alternative-flashing/#superbird-tool-for-linux)


# Legacy Flashing Methods
This page provides step-by-step instructions for legacy flashing methods for your Car Thing. It is recommended to use the steps in the section [Flashing Your Car Thing](https://carthing.wiki/first-steps/flashing). Only proceed with these flashing methods neccessary. Ensure you have completed the steps outlined in [Setting Up](https://carthing.wiki/first-steps/setup-env) before proceeding.
## Flashing Tools
Flash your car thing has a different process for Windows then for Mac and Linux. For the easiest flashing process, use a Windows device
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-9)
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-10)
  * [ ](https://carthing.wiki/legacy/alternative-flashing/#tab-panel-11)


### Bundled Installer Tool
Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Extract the windows-bundled.zip into an accessible location and navigate to the extracted directory.
3.) Within the directory, double click the “flash.bat” file.
Make sure you can view file name extensions enabled with the Windows File Explorer. 
4.) Wait for the flashing process to complete. If the installation fails with an error message stating “device not found”, power cycle the device, enter back into USB burn mode, and try again. 
You may notice that the data and setting file fail. These files are unnecessary and will not impact the flashing process.  A known issue has been identified regarding compatibility with the flashing tool and AMD 5000 series CPUs. AMD has been notified and possibly working on a fix. If you run into this issue, try updating your BIOS or try the flashing process a few times. 
5.) After the flashing process completes, power cycle the car thing.
### SuperBird Tool for Mac
1.) Execute the following command to ensure the device can be found.
Terminal window
```


python3 -m pip install git+https://github.com/pyusb/pyusb




python3 -m pip install git+https://github.com/superna9999/pyamlboot




python3 superbird_tool.py --find_device


```

2.) Execute the following command to enter USB Burn Mode.
Terminal window
```


python superbird_tool.py --burn_mode


```

3.) Execute the following command to flash the device.
Terminal window
```


sudo xattr -r -d com.apple.quarantine DeskThing.app




chmod +x /Applications/DeskThing.app/Contents/Resources/mac/adb



deskthing-0..--setup

```

Additonal Steps Coming Soon!
### SuperBird Tool for Linux
1.) Execute the following command to ensure the device can be found.
Terminal window
```


sudo python3 -m pip install git+https://github.com/superna9999/pyamlboot




sudo ./superbird_tool.py --find_device


```

2.) Execute the following command to enter USB Burn Mode.
Terminal window
```


python superbird_tool.py --burn_mode


```

3.) Execute the following command to flash the device.
Terminal window
```

deskthing-0..--setup

```

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-managing-apps"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * [ Adding Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#adding-apps)
    * [ Community Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#community-apps)
  * [ Managing Installed Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#managing-installed-apps)
    * [ Modifying App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#modifying-app-settings)
    * [ Disabling, Stopping, and Deleting Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#disabling-stopping-and-deleting-apps)
    * [ Locating App Version Info ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#locating-app-version-info)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#_top)
  * [ Adding Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#adding-apps)
    * [ Community Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#community-apps)
  * [ Managing Installed Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#managing-installed-apps)
    * [ Modifying App Settings ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#modifying-app-settings)
    * [ Disabling, Stopping, and Deleting Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#disabling-stopping-and-deleting-apps)
    * [ Locating App Version Info ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps/#locating-app-version-info)


# Managing Apps
DeskThing Server can load official or community apps to extend its functionality. This section explains how to install and manage DeskThing apps. See the individual app sections for specific app details.
## Adding Apps
Official apps have been developed by RipRod or the Thing Labs team. Official apps can be installed using the following steps:
1.) Within DeskThing Server, proceed to the **Downloads** Tab.
![Highlights how to navigate to the downloads tab](https://carthing.wiki/_astro/DeskThing_Downloads.BcC4x3vy_ZzpAtO.webp)
2.) Select the **Download Latest** button to download the app. A new window should appear requesting to initialize the app. Older versions of the apps can be found by selecting the “More Downloads” button.
3.) A new popup window should appear. Select **Initialize App** to complete the install process.
4.) Navigate to the apps to see the list of downloaded apps. Some apps may display requests or have additional settings options.
![Highlights the Apps tab.](https://carthing.wiki/_astro/DeskThing_Apps.eRuWWGzW_KK5bH.webp)
### Community Apps
Communitity apps are unofficial projects. Find the full list of recognized community apps at 
Community apps can be installed using the **Upload App** button under the **Downloads** tab.
![Highlights how to upload a community app.](https://carthing.wiki/_astro/DeskThing_UploadApp.DUCu6YIb_ZClVTF.webp)
## Managing Installed Apps
Select the **Apps** tab and select the **Settings** button to manage the installed apps. See the individual app sections for specific app details.
![Highlights how to access app settings menus.](https://carthing.wiki/_astro/DeskThing_AppSettingsMenu.OHEKIfEP_ZIYMOt.webp)
### Modifying App Settings
The **Settings** tab display app settings.
![Shows an example of an apps settings options](https://carthing.wiki/_astro/DeskThing_AppSettings.Cu-Te1E5_Z2vjzz8.webp)
### Disabling, Stopping, and Deleting Apps
Definitions:
**Purge** - Delete the app from DeskThing Server
**Disable** - Stop the app until re-enabled, this is persistent.
**Stop** - Stops the app until DeskThing Server is restarted.
Under the **Actions** tab, select the desired action.
![Shows an example of an apps action tab](https://carthing.wiki/_astro/DeskThing_AppActions.BsApqJyG_Z1ln4FC.webp)
### Locating App Version Info
Find useful app info under the **Details** tab.
![Shows an example of an apps details tab](https://carthing.wiki/_astro/DeskThing_AppDetails.D8ujZ2DJ_2K0m1.webp)

---

<a id="https-carthing-wiki-legacy-adb"></a>

## https://carthing.wiki/legacy/adb/

| Source | `https://carthing.wiki/legacy/adb/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/legacy/adb/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/adb/#_top)
  * [ Android Debug Bridge (ADB) ](https://carthing.wiki/legacy/adb/#android-debug-bridge-adb)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/adb/#_top)
  * [ Android Debug Bridge (ADB) ](https://carthing.wiki/legacy/adb/#android-debug-bridge-adb)


# ADB
## Android Debug Bridge (ADB)
Download and setup ADB to allow communications between a PC and the Car Thing.
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-6)
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-7)
  * [ ](https://carthing.wiki/legacy/adb/#tab-panel-8)


Complete the following steps to flash the Car Thing.
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Windows** and accept the terms and conditions.
3.) Extract the the file “platform-tools-latest-windows.zip” and navigate to ”..\platform-tools-latest-windows\platform-tools\adb.exe”
4.) Within Windows, navigate to “Edit the system environment variables”.
5.) Under **System Properties** within the **Advanced** tab, select **Environment Variables**.
6.) Under the **System Variables** window locate the variable **Path** and select **Edit**.
7.) On the right-hand side of the window **Edit environment variables** select **New** and a new row will be highlighted.
8.) Enter the file path of the folder **platform-tools**.
The file path can easily be obtained by holding the shift key, right-clicking the folder, and selecting, **copy as path**. 
9.) Select **ok** to save the path.
10.) Verify that the tool is working properly by opening Windows PowerShell and entering “adb devices”. A device should now be listed.
A known issue has been identified regarding compatibility with the adb tool and AMD 5000 series CPUs. AMD has been notified and possibly working on a fix. If you run into this issue, try updating the pc BIOS. 
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Mac** and accept the terms and conditions.
…Additional Steps Coming Soon :(
1.) Navigate to 
2.) Scroll to the **Downloads** section and select **Download SDK Platform-Tools for Linux** and accept the terms and conditions.
…Additional Steps Coming Soon :(

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-server-config"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/server-config/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/server-config/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * [ Installation and Setup ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#installation-and-setup)
  * [ Windows - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#windows---suggested-settings-changes)
  * [ Mac - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#mac---suggested-settings-changes)
  * [ Linux - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#linux---suggested-settings-changes)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#_top)
  * [ Installation and Setup ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#installation-and-setup)
  * [ Windows - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#windows---suggested-settings-changes)
  * [ Mac - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#mac---suggested-settings-changes)
  * [ Linux - Suggested Settings Changes ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#linux---suggested-settings-changes)


# Server Configuration
The DeskThing Server application is your interface for managing DeskThing and its clients. This section describes how to install the app and configure its settings.
DeskThing supports the following platforms:
  * **Windows 10/11**
  * **Linux x64/x86**
  * **Linux ARM (Coming Soon)**
  * **Mac with ARM Processors**
  * **Mac with Intel Processors**


## Installation and Setup
Complete the following steps to connect your Car Thing to the DeskThing Desktop server. Prefer video guides? See the 
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-0)
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-1)
  * [ ](https://carthing.wiki/thinglabs-apps/deskthing/server-config/#tab-panel-2)


1.) Download the DeskThing desktop server installer from 
2.) Run deskthing-win-x.x.x-setup.exe.
3.) After running, the app should open.
4.) Navigate to **Clients**.
![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select **Skip Setup** to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration.
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Windows - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)
1.) Download the DeskThing desktop server installer from 
2.) Install deskthing-mac-arm64-x.x.x-setup.dmg for Apple Silcon Devices or deskthing-mac-x64-x.x.x-setup.dmg for intel devices.
3.) After installing, open the app.
4.) Navigate to **Clients**.
![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select *Skip Setup” to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration (More Description of config options coming soon).
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Mac - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)
1.) Download the DeskThing desktop server installer from 
2.) Install deskthing-linux-x.x.x-setup.AppImage.
3.) After installing, open the app.
4.) Navigate to **Clients**.
!![A reference image for navigating to the Clients tab](https://carthing.wiki/_astro/DeskThing_Clients.Bc_lc685_ZvaWs4.webp)
5.) No device may be found initially. Select **Refresh ADB** to refresh the device list.
6.) On your device, a new setup process should appear. Select *Skip Setup” to use the default settings. Alternatively, proceed with the right arrow and select **Edit Config** to modify the configuration (More Description of config options coming soon).
7.) The device should now be connected! You can confirm from the **Clients** tab.
Having problems? Open a support thread on the 
## Linux - Suggested Settings Changes
1.) Navigate to **Settings** in the bottom left corner and select **Device**.
2.) Enable **Auto Detect ADB** , **Use Global ADB** , and **Auto Config**. This will ensure the device properly connects each time the Car Thing boots.
![A reference image for the deskthing device settings](https://carthing.wiki/_astro/Device_Settings.36MEKKae_Z5tqGs.webp)

---

<a id="https-carthing-wiki-thinglabs-apps-deskthing-introduction"></a>

## https://carthing.wiki/thinglabs-apps/deskthing/introduction/

| Source | `https://carthing.wiki/thinglabs-apps/deskthing/introduction/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * [ Terminology ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#terminology)
  * [ Setting Up ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#setting-up)
  * [ Useful Links ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#useful-links)
    * [ Documentation ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#documentation)
    * [ Social ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#social)
    * [ Development ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#development)
    * [ Other Guides: ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#other-guides)


## On this page
  * [ Overview ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#_top)
  * [ Terminology ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#terminology)
  * [ Setting Up ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#setting-up)
  * [ Useful Links ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#useful-links)
    * [ Documentation ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#documentation)
    * [ Social ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#social)
    * [ Development ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#development)
    * [ Other Guides: ](https://carthing.wiki/thinglabs-apps/deskthing/introduction/#other-guides)


# Introduction
![The DeskThing Banner](https://carthing.wiki/_astro/DeskThing_Banner.DG6AY9b4_2QBpk.webp)
Credit for the photo: 
![A nice B-role shot from Dammit Jeff](https://carthing.wiki/_astro/DeskThing_Photo.5zXvYNQw_Z2lAkr3.webp)
DeskThing is an application that serves a control interface to a Car Thing, phone, or any other computing device. It also can load official and community-developed apps to allow control over local audio, monitor discord, or even keep an eye on the weather!
## Terminology
Keep these terms in mind when reading the documentation.
**DeskThing Client** - The image displayed on the Car Thing or other device.
**DeskThing Server** - The application installed on a computer to interface with the client.
**DeskThing Apps** - Standalone applications installed to extend the functionality of DeskThing Server.
## Setting Up
Follow through the following instructions in order to setup the Car Thing with DeskThing.
1.) [Flashing The Car Thing](https://carthing.wiki/first-steps/flashing/).
2.) [Setup DeskThing Server](https://carthing.wiki/thinglabs-apps/deskthing/server-config).
3.) [Install Apps](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps).
## Useful Links
### Documentation
  * Official Website: 
  * Github: 
  * Flashing Tool: 


### Social
  * Discord: 
  * Reddit: 
  * Youtube: 
  * Twitter/X: 


### Development
  * Trello: 
  * Donate: 


### Other Guides:
  * iFixit Flashing Guide:

---

<a id="https-carthing-wiki-legacy-setup-env"></a>

## https://carthing.wiki/legacy/setup-env/

| Source | `https://carthing.wiki/legacy/setup-env/` |
|---|---|
| Depth | 2 |

[Skip to content](https://carthing.wiki/legacy/setup-env/#_top)
  * First Steps
    * [ Flashing The Car Thing ](https://carthing.wiki/first-steps/flashing)
  * ThingLabs Apps
    * DeskThing
      * [ Introduction ](https://carthing.wiki/thinglabs-apps/deskthing/introduction)
      * [ Server Configuration ](https://carthing.wiki/thinglabs-apps/deskthing/server-config)
      * [ Managing Apps ](https://carthing.wiki/thinglabs-apps/deskthing/managing-apps)
      * [ FAQ ](https://carthing.wiki/thinglabs-apps/deskthing/faq)
      * Official Apps
        * [ Mediawin App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/mediawin/)
        * [ Spotify App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/spotify/)
        * [ System App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/system/)
        * [ Utility App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/utility/)
        * [ Vinyl Player App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/vinyl_player/)
        * [ Weather App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weather/)
        * [ Weatherwave App ](https://carthing.wiki/thinglabs-apps/deskthing/apps/weatherwave/)
  * Legacy Documentation
    * [ Setting Up ](https://carthing.wiki/legacy/setup-env)
    * [ Flashing ](https://carthing.wiki/legacy/alternative-flashing)
    * [ ADB Tools ](https://carthing.wiki/legacy/adb)
  * Troubleshooting
    * [ FAQ ](https://carthing.wiki/troubleshooting/faq)


Select theme Dark Light Auto
On this page
Overview 
  * [ Overview ](https://carthing.wiki/legacy/setup-env/#_top)
  * [ Installing Prerequisite Programs ](https://carthing.wiki/legacy/setup-env/#installing-prerequisite-programs)
    * [ Git ](https://carthing.wiki/legacy/setup-env/#git)
    * [ Python ](https://carthing.wiki/legacy/setup-env/#python)
    * [ Drivers ](https://carthing.wiki/legacy/setup-env/#drivers)


## On this page
  * [ Overview ](https://carthing.wiki/legacy/setup-env/#_top)
  * [ Installing Prerequisite Programs ](https://carthing.wiki/legacy/setup-env/#installing-prerequisite-programs)
    * [ Git ](https://carthing.wiki/legacy/setup-env/#git)
    * [ Python ](https://carthing.wiki/legacy/setup-env/#python)
    * [ Drivers ](https://carthing.wiki/legacy/setup-env/#drivers)


# Setting up your system
This page provides step-by-step instructions to set up your system for flashing your Car Thing using a legacy flashing method, from tool preparation to software configuration for a successful flashing process.
## Installing Prerequisite Programs
Flashing the CarThing requires additional programs and drivers.
### Git
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-12)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-13)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-14)


Install Git on your system 
Install Git on your system using the commad ‘git —versions’
Install Git on your system using the command ‘sudo apt install git’
### Python
Python is required to run the Car Thing flasher program (superbird).
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-15)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-16)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-17)


Python no longer needs to be manually installed for the latest Windows flashing process!
Install 
Homebrew is necessary because the macOS default python installation isn’t compatible with the installer.
Run the following command:
Terminal window
```


sudo apt-ghet install python3


```

### Drivers
To connect to the Car Thing, it is necessary to install specific drivers that are compatible with the device.
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-18)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-19)
  * [ ](https://carthing.wiki/legacy/setup-env/#tab-panel-20)


Complete the following steps to connect the Car Thing to your computer and install the proper USB Drivers.
1.) Plug in a USB-C-to-C or USB-A-to-C cable into the Car Thing Power Supply Port.
2.) While holding top preset buttons 1 and 4, plug the USB into the computer. This will put the device into USB burning mode.
![Drawing of the Car Thing for visual reference](https://carthing.wiki/_astro/CarThing.78biRuc-_Z2oq02D.webp) Ensure your USB power supply and cable are capable of passing data and providing ample power to the car thing. 
3.) Install Zadig from 
4.) After the driver is installed select options, then “list all devices”.
![A reference image of the zadig options.](https://carthing.wiki/_astro/zadig_ignore.DTshDxVm_Z1woMOU.webp)
5.) Within the drop-down change the select “GX-CHIP”. Select the “Edit” checkbox and replace the name with “WorldCup Device”.
This name is case sensitive! 
6.) In the “Driver” field select the up or down arrows to cycle through the list of drivers. Press the up arrow until you see the option “libusbK”.
7.) Select “Replace Driver” and wait for it to finish. This can take several minutes.
![A reference image of the zadig usb drivers.](https://carthing.wiki/_astro/zadig_libusbk.BhLq7kL7_1OCneL.webp) If this driver does not work, try using the WinUSB driver instead. 
To verify the driver has changed successfully, navigate to the windows device manager. You should find a drop down titled “libuse-win32 devices” and a device named “WorldCup Device”
![A reference image of the device manager device.](https://carthing.wiki/_astro/device-manager.LPzPATzP_2dXGXw.webp) Still having problems? Try uninstalling the driver within Device Manager and then power cycling the car thing. 
Terminal window
```


brew install libusb


```

With your package manager of choice install the packages
Terminal window
```


libusb libusb-compat


```

---

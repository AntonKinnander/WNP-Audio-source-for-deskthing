# wnp.keifufu.dev — Combined Documentation

> Crawled 19 pages from `https://wnp.keifufu.dev/` (depth 10, 6s)

## Table of Contents

### Depth 0

- [wnp.keifufu.dev](#https-wnp-keifufu-dev)

### Depth 1

- [getting-started](#https-wnp-keifufu-dev-cli-getting-started)
- [getting-started](#https-wnp-keifufu-dev-obs-getting-started)
- [getting-started](#https-wnp-keifufu-dev-creating-adapters-getting-started)
- [getting-started](#https-wnp-keifufu-dev-extension-getting-started)
- [getting-started](#https-wnp-keifufu-dev-rainmeter-getting-started)
- [what-is-webnowplaying](#https-wnp-keifufu-dev-what-is-webnowplaying)
- [quickstart](#https-wnp-keifufu-dev-quickstart)

### Depth 2

- [changelog](#https-wnp-keifufu-dev-cli-changelog)
- [changelog](#https-wnp-keifufu-dev-obs-changelog)
- [changelog](#https-wnp-keifufu-dev-extension-changelog)
- [supported-sites](#https-wnp-keifufu-dev-supported-sites)
- [adapter-library](#https-wnp-keifufu-dev-creating-adapters-adapter-library)
- [settings](#https-wnp-keifufu-dev-extension-settings)
- [desktop-players](#https-wnp-keifufu-dev-desktop-players)
- [changelog](#https-wnp-keifufu-dev-rainmeter-changelog)
- [troubleshooting](#https-wnp-keifufu-dev-troubleshooting)
- [spicetify](#https-wnp-keifufu-dev-spicetify)
- [usage](#https-wnp-keifufu-dev-rainmeter-usage)

---

<a id="https-wnp-keifufu-dev"></a>

## https://wnp.keifufu.dev/

| Source | `https://wnp.keifufu.dev/` |
|---|---|
| Depth | 0 |

[ Skip to content ](https://wnp.keifufu.dev/#VPContent)
# WebNowPlaying
Enables programs to read and control media players
[Getting Started](https://wnp.keifufu.dev/quickstart)
[Documentation](https://wnp.keifufu.dev/what-is-webnowplaying)
## [Browser Extension Provides support for browser-based players ](https://wnp.keifufu.dev/extension/getting-started)
## [Rainmeter Plugin Allows Rainmeter skins to interact with WebNowPlaying ](https://wnp.keifufu.dev/rainmeter/getting-started)
## [OBS Script Customizable WebNowPlaying widgets in OBS ](https://wnp.keifufu.dev/obs/getting-started)
## [CLI Command-line interface for WebNowPlaying ](https://wnp.keifufu.dev/cli/getting-started)
## [Creating Adapters Learn how to create your own adapter ](https://wnp.keifufu.dev/creating-adapters/getting-started)

---

<a id="https-wnp-keifufu-dev-cli-getting-started"></a>

## https://wnp.keifufu.dev/cli/getting-started

| Source | `https://wnp.keifufu.dev/cli/getting-started` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/cli/getting-started#VPContent)
Menu
Return to top
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 


# WebNowPlaying CLI [​](https://wnp.keifufu.dev/cli/getting-started#webnowplaying-cli)
A CLI adapter for   
Support for desktop players is limited to Windows as of now.
# Installing [​](https://wnp.keifufu.dev/cli/getting-started#installing)
Download from 
# Usage [​](https://wnp.keifufu.dev/cli/getting-started#usage)
Currently, the daemon has to be started manually, with `wnpcli start-daemon`.  
This might change in the future if I package the software / create an installer.
console
```
Usage: wnpcli [OPTION...] COMMAND [ARG]

Available Commands:
  start-daemon            Starts the daemon
  stop-daemon             Stops the daemon
  metadata [key]          Prints metadata information
  set-state [state]       Can be PLAYING, PAUSED or STOPPED
  skip-previous           Skip to the previous track
  skip-next               Skip to the next track
  set-position [x][+/-]   Set the position or seek forward/backward x in seconds
  set-volume [x]          Set the volume from 0 to 100
  set-rating [x]          Set the rating from 0 to 5
  set-repeat [repeat]     Set the repeat mode. Can be NONE, ALL or ONE
  set-shuffle [shuffle]   Set the shuffle. Can be 0 or 1
  play-pause              Toggle between playing/paused
  toggle-repeat           Toggle between repeat modes
  select-active           Set the selection to the active player
  select-previous         Set the selection to the previous player
  select-next             Set the selection to the next player

Available Options:
  -p, --player=ID         The player to target. Can be active, selected, or a players ID (default: active)
  -f, --format=FORMAT     A format string for printing properties and metadata
  -F, --follow            Block and append the query to output when it changes
  -l, --list-all          List the ids of all players
  -w, --wait              Block until the event finishes
  -h, --help              Show this help list
  -v, --version           Print program version
```

---

<a id="https-wnp-keifufu-dev-obs-getting-started"></a>

## https://wnp.keifufu.dev/obs/getting-started

| Source | `https://wnp.keifufu.dev/obs/getting-started` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/obs/getting-started#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Adding python to OBS](https://wnp.keifufu.dev/obs/getting-started#adding-python-to-obs "Adding python to OBS")
  * [Installing the script](https://wnp.keifufu.dev/obs/getting-started#installing-the-script "Installing the script")
  * [Updating](https://wnp.keifufu.dev/obs/getting-started#updating "Updating")
  * [Known Issues](https://wnp.keifufu.dev/obs/getting-started#known-issues "Known Issues")


On this page 
# OBS Script [​](https://wnp.keifufu.dev/obs/getting-started#obs-script)
**Note:** This script is using the unmaintained   
It will continue to work but newer features will not be available.
## Adding python to OBS [​](https://wnp.keifufu.dev/obs/getting-started#adding-python-to-obs)
  * Install Python 3.10 (
  * In OBS, go to Tools -> Scripts -> Python Settings, and add the path to your Python installation.  
(On windows, run `where python` in cmd to find the installation location.)


## Installing the script [​](https://wnp.keifufu.dev/obs/getting-started#installing-the-script)
  * Open the command prompt and run `python -m pip install pywnp`
  * Download 
  * Select a Widget or click "Create Sources" in the Scripts window.


## Updating [​](https://wnp.keifufu.dev/obs/getting-started#updating)
  * Replace `wnp-obs.py` with the latest version from releases: 
  * Open the command prompt and run `python -m pip install --upgrade pywnp`.


## Known Issues [​](https://wnp.keifufu.dev/obs/getting-started#known-issues)
  * Reloading the script might cause it to spam errors or not work at all. If you need to reload it for some reason, restart OBS. If you have reloaded the script and it still doesn't work after restarting OBS, try restarting your computer.

---

<a id="https-wnp-keifufu-dev-creating-adapters-getting-started"></a>

## https://wnp.keifufu.dev/creating-adapters/getting-started

| Source | `https://wnp.keifufu.dev/creating-adapters/getting-started` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/creating-adapters/getting-started#VPContent)
Menu
Return to top
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 


# Creating Adapters [​](https://wnp.keifufu.dev/creating-adapters/getting-started#creating-adapters)
Adapters are implemented using the [Adapter Library](https://wnp.keifufu.dev/creating-adapters/adapter-library), which is written in C.
### Language bindings [​](https://wnp.keifufu.dev/creating-adapters/getting-started#language-bindings)
There are currently no bindings for the library.
### Testing your adapter [​](https://wnp.keifufu.dev/creating-adapters/getting-started#testing-your-adapter)
You can connect the browser extension to your adapter by clicking "Add custom adapter" in the [extension settings](https://wnp.keifufu.dev/extension/settings).
### Submitting your adapter [​](https://wnp.keifufu.dev/creating-adapters/getting-started#submitting-your-adapter)
**Requirements**
  * Must be open-sourced on GitHub
  * Executables, plugins or scripts must be published via GitHub releases
  * GitHub releases must be tagged as "vmajor.minor.patch" or "major.minor.patch" where major should be the current library revision
  * Must use a unique port, which cannot be changed after submitting your adapter.
  * GitHub repository should be named "WebNowPlaying-name" e.g. "WebNowPlaying-Rainmeter".


If your adapter meets the requirements, open an issue 

```
Issue Title: Request: Add <Adapter Name>
---
Name: <Adapter Name>
GitHub: <GitHub Link>
Description: <Short description of what your adapter is used for and a justification for it to be listed in the extension>
```

---

<a id="https-wnp-keifufu-dev-extension-getting-started"></a>

## https://wnp.keifufu.dev/extension/getting-started

| Source | `https://wnp.keifufu.dev/extension/getting-started` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/extension/getting-started#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Installing](https://wnp.keifufu.dev/extension/getting-started#installing "Installing")


On this page 
# Getting Started [​](https://wnp.keifufu.dev/extension/getting-started#getting-started)
## Installing [​](https://wnp.keifufu.dev/extension/getting-started#installing)
For Edge, Opera, Brave and other Chromium-based browsers, you can find the extension on the Chrome Web Store.  
All Chromium-based browsers allow you to add extensions from the Chrome Web Store.

---

<a id="https-wnp-keifufu-dev-rainmeter-getting-started"></a>

## https://wnp.keifufu.dev/rainmeter/getting-started

| Source | `https://wnp.keifufu.dev/rainmeter/getting-started` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/rainmeter/getting-started#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Installing](https://wnp.keifufu.dev/rainmeter/getting-started#installing "Installing")
  * [Install a compatible skin](https://wnp.keifufu.dev/rainmeter/getting-started#install-a-compatible-skin "Install a compatible skin")


On this page 
# Rainmeter Plugin [​](https://wnp.keifufu.dev/rainmeter/getting-started#rainmeter-plugin)
## Installing [​](https://wnp.keifufu.dev/rainmeter/getting-started#installing)
Download and install the latest WebNowPlaying plugin for Rainmeter
Or with   
`mond install keifufu/WebNowPlaying-Rainmeter`
## Install a compatible skin [​](https://wnp.keifufu.dev/rainmeter/getting-started#install-a-compatible-skin)
The WebNowPlaying Plugin comes bundled with an example skin you can use to test if it works.
If a skin already supports WebNowPlaying, it will work out of the box. You're done!
If it uses NowPlaying, WindowsNowPlaying, MediaPlayer or the outdated Spotify plugin, you have the following options:
  * Use 
  * Modify the skin yourself!

---

<a id="https-wnp-keifufu-dev-what-is-webnowplaying"></a>

## https://wnp.keifufu.dev/what-is-webnowplaying

| Source | `https://wnp.keifufu.dev/what-is-webnowplaying` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/what-is-webnowplaying#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Adapters](https://wnp.keifufu.dev/what-is-webnowplaying#adapters "Adapters")
  * [History](https://wnp.keifufu.dev/what-is-webnowplaying#history "History")


On this page 
# What is WebNowPlaying? [​](https://wnp.keifufu.dev/what-is-webnowplaying#what-is-webnowplaying)
Just want to try it out? Skip to the [Quickstart](https://wnp.keifufu.dev/quickstart).
WebNowPlaying (or WebNowPlaying-Redux) enables programs to read and control media players.
  * Browser extension - Provides support for browser-based players.
  * Adapter library - Communicates with the browser extension and provides support for [Desktop Players](https://wnp.keifufu.dev/desktop-players).


## Adapters [​](https://wnp.keifufu.dev/what-is-webnowplaying#adapters)
These are programs, plugins or scripts make use of WebNowPlaying.
**Official Adapters**
  * Rainmeter Plugin ([Docs](https://wnp.keifufu.dev/rainmeter/getting-started), 
  * OBS Script ([Docs](https://wnp.keifufu.dev/obs/getting-started), 
  * CLI ([Docs](https://wnp.keifufu.dev/cli/getting-started), 


**Third-party adapters**
  * Macro Deck Plugin (


Want to create or submit your own adapter? Click [here](https://wnp.keifufu.dev/creating-adapters/getting-started)!
## History [​](https://wnp.keifufu.dev/what-is-webnowplaying#history)
A rough changelog of the major versions. For a more complete changelog, see:
  * [Extension changelog](https://wnp.keifufu.dev/extension/changelog)
  * [Rainmeter Plugin changelog](https://wnp.keifufu.dev/rainmeter/changelog)
  * [OBS Script changelog](https://wnp.keifufu.dev/obs/changelog)
  * [CLI changelog](https://wnp.keifufu.dev/cli/changelog)


**v0.x**
These versions were created by   
WebNowPlaying is a drop-in replacement for Rainmeter's   
It also allowed for additonl controls, such as the players volume.
**v1.x**
Versions from here on were created by   
The extension could now connect to multiple adapters.
**v2.x**
Support for Desktop Players was added, read more about it [here](https://wnp.keifufu.dev/desktop-players).  
Adapters can now also read what functionality the current media supports, e.g., `canSkipNext`, `canSetRating`, etc.
**v3.x**
Adapters can read and send events to all/any player(s) instead of just the active one.  
Events return whether they succeeded or failed.  
Players report their available repeat modes.  
Shuffle and repeat modes can now be set instead of just toggled.

---

<a id="https-wnp-keifufu-dev-quickstart"></a>

## https://wnp.keifufu.dev/quickstart

| Source | `https://wnp.keifufu.dev/quickstart` |
|---|---|
| Depth | 1 |

[ Skip to content ](https://wnp.keifufu.dev/quickstart#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Install the browser extension](https://wnp.keifufu.dev/quickstart#install-the-browser-extension "Install the browser extension")
  * [Install the Rainmeter plugin](https://wnp.keifufu.dev/quickstart#install-the-rainmeter-plugin "Install the Rainmeter plugin")
  * [Install a compatible skin](https://wnp.keifufu.dev/quickstart#install-a-compatible-skin "Install a compatible skin")
  * [Troubleshooting](https://wnp.keifufu.dev/quickstart#troubleshooting "Troubleshooting")


On this page 
# Quickstart [​](https://wnp.keifufu.dev/quickstart#quickstart)
**Note** : This page assumes you are using Rainmeter, as it's the most popular option.
## Install the browser extension [​](https://wnp.keifufu.dev/quickstart#install-the-browser-extension)
## Install the Rainmeter plugin [​](https://wnp.keifufu.dev/quickstart#install-the-rainmeter-plugin)
Download and install the latest WebNowPlaying plugin for Rainmeter
## Install a compatible skin [​](https://wnp.keifufu.dev/quickstart#install-a-compatible-skin)
The WebNowPlaying Plugin comes bundled with an example skin you can use to test if it works.
If a skin already supports WebNowPlaying, it will work out of the box. You're done!
If it uses NowPlaying, WindowsNowPlaying, MediaPlayer or the outdated Spotify plugin, you have the following options:
  * Use 
  * Modify the skin yourself!


## Troubleshooting [​](https://wnp.keifufu.dev/quickstart#troubleshooting)
If something is still not working, read the [Troubleshooting](https://wnp.keifufu.dev/troubleshooting) guide.

---

<a id="https-wnp-keifufu-dev-cli-changelog"></a>

## https://wnp.keifufu.dev/cli/changelog

| Source | `https://wnp.keifufu.dev/cli/changelog` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/cli/changelog#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [v3.0.0](https://wnp.keifufu.dev/cli/changelog#v3-0-0 "v3.0.0")


On this page 
# Changelog [​](https://wnp.keifufu.dev/cli/changelog#changelog)
Full changelog available via 
## v3.0.0 [​](https://wnp.keifufu.dev/cli/changelog#v3-0-0)
  * Initial Release

---

<a id="https-wnp-keifufu-dev-obs-changelog"></a>

## https://wnp.keifufu.dev/obs/changelog

| Source | `https://wnp.keifufu.dev/obs/changelog` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/obs/changelog#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [v2.0.0](https://wnp.keifufu.dev/obs/changelog#v2-0-0 "v2.0.0")
  * [v1.1.0](https://wnp.keifufu.dev/obs/changelog#v1-1-0 "v1.1.0")
  * [v1.0.1](https://wnp.keifufu.dev/obs/changelog#v1-0-1 "v1.0.1")
  * [v1.0.0](https://wnp.keifufu.dev/obs/changelog#v1-0-0 "v1.0.0")


On this page 
# Changelog [​](https://wnp.keifufu.dev/obs/changelog#changelog)
Full changelog available via 
## v2.0.0 [​](https://wnp.keifufu.dev/obs/changelog#v2-0-0)
  * Updated to PyWNP 2.0.0, which adds support for desktop players.


## v1.1.0 [​](https://wnp.keifufu.dev/obs/changelog#v1-1-0)
  * Added widgets!


## v1.0.1 [​](https://wnp.keifufu.dev/obs/changelog#v1-0-1)
  * Added option to provide a custom url for the default cover art


## v1.0.0 [​](https://wnp.keifufu.dev/obs/changelog#v1-0-0)
  * Initial Release

---

<a id="https-wnp-keifufu-dev-extension-changelog"></a>

## https://wnp.keifufu.dev/extension/changelog

| Source | `https://wnp.keifufu.dev/extension/changelog` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/extension/changelog#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [v3.0.1](https://wnp.keifufu.dev/extension/changelog#v3-0-1 "v3.0.1")
  * [v3.0.0](https://wnp.keifufu.dev/extension/changelog#v3-0-0 "v3.0.0")
  * [v2.0.10](https://wnp.keifufu.dev/extension/changelog#v2-0-10 "v2.0.10")
  * [v2.0.9](https://wnp.keifufu.dev/extension/changelog#v2-0-9 "v2.0.9")
  * [v2.0.8](https://wnp.keifufu.dev/extension/changelog#v2-0-8 "v2.0.8")
  * [v2.0.7](https://wnp.keifufu.dev/extension/changelog#v2-0-7 "v2.0.7")
  * [v2.0.6](https://wnp.keifufu.dev/extension/changelog#v2-0-6 "v2.0.6")
  * [v2.0.5](https://wnp.keifufu.dev/extension/changelog#v2-0-5 "v2.0.5")
  * [v2.0.4](https://wnp.keifufu.dev/extension/changelog#v2-0-4 "v2.0.4")
  * [v2.0.3](https://wnp.keifufu.dev/extension/changelog#v2-0-3 "v2.0.3")
  * [v2.0.2](https://wnp.keifufu.dev/extension/changelog#v2-0-2 "v2.0.2")
  * [v2.0.1](https://wnp.keifufu.dev/extension/changelog#v2-0-1 "v2.0.1")
  * [v2.0.0](https://wnp.keifufu.dev/extension/changelog#v2-0-0 "v2.0.0")
  * [v1.3.1](https://wnp.keifufu.dev/extension/changelog#v1-3-1 "v1.3.1")
  * [v1.3.0](https://wnp.keifufu.dev/extension/changelog#v1-3-0 "v1.3.0")
  * [v1.2.3](https://wnp.keifufu.dev/extension/changelog#v1-2-3 "v1.2.3")
  * [v1.2.2](https://wnp.keifufu.dev/extension/changelog#v1-2-2 "v1.2.2")
  * [v1.2.1](https://wnp.keifufu.dev/extension/changelog#v1-2-1 "v1.2.1")
  * [v1.2.0](https://wnp.keifufu.dev/extension/changelog#v1-2-0 "v1.2.0")
  * [v1.1.0](https://wnp.keifufu.dev/extension/changelog#v1-1-0 "v1.1.0")
  * [v1.0.1](https://wnp.keifufu.dev/extension/changelog#v1-0-1 "v1.0.1")
  * [v1.0.0](https://wnp.keifufu.dev/extension/changelog#v1-0-0 "v1.0.0")


On this page 
# Changelog [​](https://wnp.keifufu.dev/extension/changelog#changelog)
Full changelog available via 
## v3.0.1 [​](https://wnp.keifufu.dev/extension/changelog#v3-0-1)
  * No longer forces users to grant missing permissions


## v3.0.0 [​](https://wnp.keifufu.dev/extension/changelog#v3-0-0)
  * Improved support for all sites *¹
  * Added support for v3 adapters 
    * Events now return event results indicating whether they succeeded or failed
    * Adapters get sent all players instead of just the active one
    * Events can be sent to any player instead of just the active one
    * Players report their available repeat modes
    * Repeat mode can now be set invididually instead of toggled
    * Shuffle can now be set instead of toggled
  * Ask for permissions in the settings interface when browsers didn't prompt the user
  * non-v3 adapters will toggle repeat modes in a consistent order (NONE -> ALL -> ONE), skipping unavailable ones
  * Optimization / performance improvements
  * Removed manual and automatic reporting functionality
  * Added CLI adapter
  * Updated the settings interface
  * Miscellaneous bug fixes and improvements


*¹ See <https://wnp.keifufu.dev/supported-sites>
## v2.0.10 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-10)
  * Added support for vk.com


## v2.0.9 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-9)
  * Fixed Apple Music Duration


## v2.0.8 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-8)
  * Disabled reports as they are currently useless


## v2.0.7 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-7)
  * Fixed YouTube Music covers


## v2.0.6 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-6)
  * Updated links to new documentation
  * Remove " - Topic" from artists


## v2.0.5 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-5)
  * Properly fix what should have been fixed in 2.0.3 and 2.0.4


## v2.0.4 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-4)
  * Fixed Spotify rating


## v2.0.3 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-3)
  * Now always skips to the previous song instead of the beginning of the song


## v2.0.2 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-2)
  * Added support for Kick


## v2.0.1 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-1)
  * Added support for Yandex Music


## v2.0.0 [​](https://wnp.keifufu.dev/extension/changelog#v2-0-0)
  * Added controls for Native APIs
  * Updated communication protocol to revision 2
  * Minor bug fixes


## v1.3.1 [​](https://wnp.keifufu.dev/extension/changelog#v1-3-1)
  * Better supports for Jellyfin covers
  * "Unsupported Sites" can no longer run on disabled supported sites
  * Fix some issues with the new Settings UI


## v1.3.0 [​](https://wnp.keifufu.dev/extension/changelog#v1-3-0)
  * Updated the settings UI to allow for more control over the adapters connection state
  * Added support for Jellyfin
  * Added support for Invidious
  * Added OBS adapter
  * Fixed YouTube music cover not returning sometimes
  * Fixed YouTube and Twitch volume being discarded after switching videos/streams
  * Improved re-connection logic, especially on Firefox
  * Switched to using local storage instead of synced storage. This means extension settings will not sync across browsers and they will have reset after updating to this version
  * Sends media info right after connecting to a adapter, instead of once something updated


## v1.2.3 [​](https://wnp.keifufu.dev/extension/changelog#v1-2-3)
  * Various small bug fixes


## v1.2.2 [​](https://wnp.keifufu.dev/extension/changelog#v1-2-2)
  * Update settings UI
  * Fix 'Unsupported Websites' returning a poorly formatted cover URL
  * Other minor fixes


## v1.2.1 [​](https://wnp.keifufu.dev/extension/changelog#v1-2-1)
  * Fixed generic site initializing more than once


## v1.2.0 [​](https://wnp.keifufu.dev/extension/changelog#v1-2-0)
  * Added Netflix support
  * Added chapter skipping on YouTube, (Settings UI -> Supported Sites -> YouTube -> Settings Icon) to enable
  * Fixed YouTube Music volume not setting correctly
  * Added button in settings UI to 'Apply and Reload'
  * Minor bug fixes


## v1.1.0 [​](https://wnp.keifufu.dev/extension/changelog#v1-1-0)
  * Added support for Navidrome
  * Added support for Radio Addict
  * Added support for YouTube Shorts
  * Now opens one websocket per adapter instead of one per adapter per tab
  * Enabled version checking
  * Show authors next to adapter name
  * Various other fixes


## v1.0.1 [​](https://wnp.keifufu.dev/extension/changelog#v1-0-1)
  * Fixed a memory leak and various other bug fixes.


## v1.0.0 [​](https://wnp.keifufu.dev/extension/changelog#v1-0-0)
  * Initial Release

---

<a id="https-wnp-keifufu-dev-supported-sites"></a>

## https://wnp.keifufu.dev/supported-sites

| Source | `https://wnp.keifufu.dev/supported-sites` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/supported-sites#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Notes](https://wnp.keifufu.dev/supported-sites#notes "Notes")
  * [Unsupported sites](https://wnp.keifufu.dev/supported-sites#unsupported-sites "Unsupported sites")


On this page 
# Supported Sites [​](https://wnp.keifufu.dev/supported-sites#supported-sites)  
| Site  | Status  |  
| --- | --- |  
| Apple Music  | Fully supported  |  
| Bandcamp  | Fully supported  |  
| Deezer  | Fully supported  |  
| Invidious  | Fully supported  |  
| Jellyfin  | Partially supported: music player missing  |  
| Kick  | Fully supported  |  
| Navidrome  | Fully supported  |  
| Netflix  | Fully supported  |  
| Pandora  | Partially supported, unmaintained: region-locked  |  
| Plex  | Partially supported: Their player is a mess  |  
| Radio Addict  | Fully supported  |  
| SoundCloud  | Fully supported  |  
| Spotify  | Fully supported  |  
| Tidal  | Partially supported, unmaintained: paid-only  |  
| Twitch  | Fully supported  |  
| VK  | Fully supported  |  
| Yandex Music  | Partially supported, unmaintained: region-locked  |  
| YouTube  | Fully supported  |  
| YouTube Embeds  | Fully supported  |  
| YouTube Music  | Fully supported  |  
## Notes [​](https://wnp.keifufu.dev/supported-sites#notes)
  * Yandex Music was implemented and tested by 


## Unsupported sites [​](https://wnp.keifufu.dev/supported-sites#unsupported-sites)
Enabling "Try to parse media on unsupported websites" under "Unsupported Sites" in the extension settings might work. Read more [here](https://wnp.keifufu.dev/extension/settings#unsupported-sites).

---

<a id="https-wnp-keifufu-dev-creating-adapters-adapter-library"></a>

## https://wnp.keifufu.dev/creating-adapters/adapter-library

| Source | `https://wnp.keifufu.dev/creating-adapters/adapter-library` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/creating-adapters/adapter-library#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Usage](https://wnp.keifufu.dev/creating-adapters/adapter-library#usage "Usage")


On this page 
# Adapter Library [​](https://wnp.keifufu.dev/creating-adapters/adapter-library#adapter-library)
## Usage [​](https://wnp.keifufu.dev/creating-adapters/adapter-library#usage)
  * See 
  * See examples in 


c
```
examples/simple.c:
#include "stdio.h"
#include "wnp.h"

int main(void)
{
  // port, adapter version
  if (wnp_start(1234, "1.0.0", NULL) < 0) {
    perror("Failed to start wnp");
    return -1;
  }

  for (int i = 0; i < 60; i++) {
    // get the "active" player
    struct wnp_player* player = wnp_get_active_player(true);
    // print the title
    wnp_lock(player);
    printf("Title: %s\n", player->title);
    wnp_unlock(player);
    // try to play-pause
    int event_id = wnp_try_play_pause(player);
    // optionally, wait for a result
    char* event_outcomes[] = {"", "succeeded", "failed"};
    printf("event %d %s\n", event_id, event_outcomes[wnp_wait_for_event_result(event_id)]);
    sleep_ms(1000);
  }

  wnp_stop();
  return 0;
}
```

---

<a id="https-wnp-keifufu-dev-extension-settings"></a>

## https://wnp.keifufu.dev/extension/settings

| Source | `https://wnp.keifufu.dev/extension/settings` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/extension/settings#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Home page](https://wnp.keifufu.dev/extension/settings#home-page "Home page")
  * [Sanitization](https://wnp.keifufu.dev/extension/settings#sanitization "Sanitization")
  * [Supported Sites](https://wnp.keifufu.dev/extension/settings#supported-sites "Supported Sites")
  * [Unsupported Sites](https://wnp.keifufu.dev/extension/settings#unsupported-sites "Unsupported Sites")
  * [Desktop Players](https://wnp.keifufu.dev/extension/settings#desktop-players "Desktop Players")


On this page 
# Settings [​](https://wnp.keifufu.dev/extension/settings#settings)
The settings panel is accessible by clicking on the extension icon in your toolbar or the extension overflow menu.
## Home page [​](https://wnp.keifufu.dev/extension/settings#home-page)
This is a list of all available adapters.  
Toggling the checkbox on the left of them will enable or disable them.  
Hovering over them will reveal more options, such as temporarily disconnecting them or for custom adapters, removing them.
## Sanitization [​](https://wnp.keifufu.dev/extension/settings#sanitization)
Accessible via the settings button in the top right corner.  
Here you can toggle optional sanitization settings.
## Supported Sites [​](https://wnp.keifufu.dev/extension/settings#supported-sites)
Accessible via the settings button in the top right corner.  
This is a list of all supported sites and allows toggling them on or off.  
Certain sites like YouTube also have a settings icon next to them, clicking it reveals more settings about the site.
## Unsupported Sites [​](https://wnp.keifufu.dev/extension/settings#unsupported-sites)
Accessible via the settings button in the top right corner.  
"Unsupported Sites" are sites that don't have explicit support like ones from the previous tab.  
Enabling these isn't guaranteed to work, but it usually does a good job.
You can either enable it for all websites or set a allow/deny list.
## Desktop Players [​](https://wnp.keifufu.dev/extension/settings#desktop-players)
Toggle whether adapters should use [Desktop Players](https://wnp.keifufu.dev/desktop-players).

---

<a id="https-wnp-keifufu-dev-desktop-players"></a>

## https://wnp.keifufu.dev/desktop-players

| Source | `https://wnp.keifufu.dev/desktop-players` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/desktop-players#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Caveats](https://wnp.keifufu.dev/desktop-players#caveats "Caveats")
  * [List of supported players](https://wnp.keifufu.dev/desktop-players#list-of-supported-players "List of supported players")
  * [Disabling or enabling](https://wnp.keifufu.dev/desktop-players#disabling-or-enabling "Disabling or enabling")


On this page 
# Desktop Players [​](https://wnp.keifufu.dev/desktop-players#desktop-players)
**Note:** Support for Desktop Players is exclusive to Windows as of right now.
This allows adapters to read and interact with desktop players that integrate with the 
Browsers are explicitly excluded from this to avoid interference with the browser extension.
## Caveats [​](https://wnp.keifufu.dev/desktop-players#caveats)
  * Volume and rating control is not supported, as the Windows API does not provide support for them.
  * Some players might only support a subset of the API's features. They might report the title, artist, etc. correctly but may not expose functionality like pausing, setting position, etc.


## List of supported players [​](https://wnp.keifufu.dev/desktop-players#list-of-supported-players)
See 
## Disabling or enabling [​](https://wnp.keifufu.dev/desktop-players#disabling-or-enabling)
Support for Desktop Players is enabled by default.  
You can toggle it via the "Desktop Players" checkbox in the [extension settings](https://wnp.keifufu.dev/extension/settings).

---

<a id="https-wnp-keifufu-dev-rainmeter-changelog"></a>

## https://wnp.keifufu.dev/rainmeter/changelog

| Source | `https://wnp.keifufu.dev/rainmeter/changelog` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/rainmeter/changelog#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [v2.0.7](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-7 "v2.0.7")
  * [v2.0.6](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-6 "v2.0.6")
  * [v2.0.5](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-5 "v2.0.5")
  * [v2.0.4](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-4 "v2.0.4")
  * [v2.0.3](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-3 "v2.0.3")
  * [v2.0.2](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-2 "v2.0.2")
  * [v2.0.1](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-1 "v2.0.1")
  * [v2.0.0](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-0 "v2.0.0")
  * [v1.2.0](https://wnp.keifufu.dev/rainmeter/changelog#v1-2-0 "v1.2.0")
  * [v1.1.7](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-7 "v1.1.7")
  * [v1.1.6](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-6 "v1.1.6")
  * [v1.1.5](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-5 "v1.1.5")
  * [v1.1.4](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-4 "v1.1.4")
  * [v1.1.3](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-3 "v1.1.3")
  * [v1.1.2](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-2 "v1.1.2")
  * [v1.1.1](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-1 "v1.1.1")
  * [v1.1.0](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-0 "v1.1.0")
  * [v1.0.6](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-6 "v1.0.6")
  * [v1.0.5](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-5 "v1.0.5")
  * [v1.0.4](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-4 "v1.0.4")
  * [v1.0.3](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-3 "v1.0.3")
  * [v1.0.2](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-2 "v1.0.2")
  * [v1.0.1](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-1 "v1.0.1")
  * [v1.0.0](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-0 "v1.0.0")
  * [v0.5.0](https://wnp.keifufu.dev/rainmeter/changelog#v0-5-0 "v0.5.0")
  * [v0.4.0](https://wnp.keifufu.dev/rainmeter/changelog#v0-4-0 "v0.4.0")
  * [v0.3.0](https://wnp.keifufu.dev/rainmeter/changelog#v0-3-0 "v0.3.0")
  * [v0.2.5](https://wnp.keifufu.dev/rainmeter/changelog#v0-2-5 "v0.2.5")


On this page 
# Changelog [​](https://wnp.keifufu.dev/rainmeter/changelog#changelog)
Full changelog available via 
## v2.0.7 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-7)
  * Added `Play` and `Pause` bangs.
  * Fixed Firefox not being ignored when Native APIs are enabled on Windows 10.


## v2.0.6 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-6)
  * `PlayerType=Progress` defaults to 0 instead of 100
  * Fix crashes (


## v2.0.5 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-5)
  * Fixed Int32 overflow causing `SetPosition` not being able to set the position past a few minutes for desktop players


## v2.0.4 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-4)
  * Improved optimistic position updates, which makes the position skip less when using desktop players. This also fixed 


## v2.0.3 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-3)
  * Fixed covers not saving for skins using `CoverPath=`, which the majority of outdated skins use.


## v2.0.2 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-2)
  * Removed Spotify watermark from covers on Windows 10


## v2.0.1 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-1)
  * Updated WNPReduxAdapterLibrary to 2.0.1 (
  * Fixed position updating sluggishly in certain cases (Read Issue 


## v2.0.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v2-0-0)
  * Added support for Desktop Players
  * Updated WNPReduxAdapterLibrary to 2.0.0 (
  * Added new measures. Please read the updated usage instructions for reference.
  * Bumped minimum supported version to windows 10.


## v1.2.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-2-0)
  * Added `PlayerType=Remaining` measure, returns remaining time in (hh):mm:ss
  * Update Example Skin to include updated instructions/comments and add example of the Remaining measure


## v1.1.7 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-7)
  * Fix `SetPosition` bang not working with doubles for certain languages


## v1.1.6 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-6)
  * Update WNPReduxAdapterLibrary to 1.0.7, fixing `PlayerType=Progress` returning either 0 or 1, instead of a double.


## v1.1.5 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-5)
  * Update WNPReduxAdapterLibrary to 1.0.6, fixing WebNowPlaying being unable to connect after loading a new layout.


## v1.1.4 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-4)
  * Potential fix for issues with file access when downloading cover art
  * Update WNPReduxAdapterLibrary to 1.0.5
  * Improved log messages


## v1.1.3 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-3)
  * Fixed more issues with covers not downloading/returning correctly


## v1.1.2 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-2)
  * Fixed `CoverWebAddress` updating before the cover art finished downloading


## v1.1.1 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-1)
  * Fixed random crash


## v1.1.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-1-0)
  * Fixed Rainmeter hanging while cover art is downloading
  * Images are now saved to all paths registered with CoverPath= for backwards compatibility
  * CoverPath= should no longer be used if possible, please read the path from the PlayerType=Cover measure


## v1.0.6 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-6)
  * Fixed `PlayerType=Cover` returning a path with forwards-slashes


## v1.0.5 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-5)
  * Can now download covers from urls with a permanent redirect (HTTP 308)


## v1.0.4 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-4)
  * Fixed a crash that would occur when the extension returns a invalid cover URL.


## v1.0.3 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-3)
  * Updated to WNPReduxAdapterLibrary 1.0.3, which fixed an edgecase for mediaInfo not reflecting the currently playing media.


## v1.0.2 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-2)
  * Fix cover art only downloading to windows temp directory


## v1.0.1 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-1)
  * Fixed cover switching incorrectly when new skins loaded


## v1.0.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v1-0-0)
  * Initial Redux Release


## v0.5.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v0-5-0)
Just some general fixes with downloading cover art from sites that only support certain sites. Also added the version check support that I thought I had added before but I guess I did not
## v0.4.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v0-4-0)
This version is a complete rewrite of the extension since the last version. This rewrite should make it easier to keep the extension up to date and also merged both browser extensions to a single codebase.
New features include: Removed unneeded APIs Fixed issue with icons in example skin. More sites supported. A generic site supporter that when enabled will try to support sites without explicit support such a streamable or reddit. (Note: wont capture elements inside a iframe yet) Version checking, extension will now notify you when the plugin is out of date. Settings for the companion extension, they are not all implemented yet since the projects they rely on are unreleased.
To update simply install the rmskin down below.
## v0.3.0 [​](https://wnp.keifufu.dev/rainmeter/changelog#v0-3-0)
Now the extensions support quite a few more sites as well as setting the position and volume of the meter.
The Spotify API is also now being used to get the album and album art of the current song. In the future this API as well as several others such as Twitch and Youtube will be added to make Rainmeter skin makers lives easier.
Since this is now integrated into the official Monstercat Visualizer and we are halfway between releases I am only including the rmskin of the example skin.
## v0.2.5 [​](https://wnp.keifufu.dev/rainmeter/changelog#v0-2-5)
First release of the plugin. You will need to install either the chrome or firefox companion for this to work.
Given that this is an early release I expect regional variants or minor issues with the various supported websites. If any information looks wrong or isn't working please report it. (Check that Rainmeter has a firewall exception though if nothing is working 😛 )
The current list of supported sites is: Youtube Twitch Soundcloud Google Play Music Amazon Music
The standard bangs and info are supported and follow a NowPlaying style, for now just look at the example until I get documentation written which will come once SetPosition and SetVolume are supported.

---

<a id="https-wnp-keifufu-dev-troubleshooting"></a>

## https://wnp.keifufu.dev/troubleshooting

| Source | `https://wnp.keifufu.dev/troubleshooting` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/troubleshooting#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Adapter not connecting](https://wnp.keifufu.dev/troubleshooting#adapter-not-connecting "Adapter not connecting")
  * [Amazon music bmw](https://wnp.keifufu.dev/troubleshooting#amazon-music-bmw "Amazon music bmw")
  * [Ask for help](https://wnp.keifufu.dev/troubleshooting#ask-for-help "Ask for help")


On this page 
# Troubleshooting [​](https://wnp.keifufu.dev/troubleshooting#troubleshooting)
## Adapter not connecting [​](https://wnp.keifufu.dev/troubleshooting#adapter-not-connecting)
It's likely the browser just needs some time to connect, when you continiously retry connecting it might take a few minutes to catch up.
**Adapter is not running**
Start it.
If you're using Rainmeter, make sure you have a skin using the WebNowPlaying plugin loaded.
**You're using an adblocker**
Some adblockers block requests to localhost, which prevents the extension to connect to your adapters.  
To fix this, add the following to your adblocker's filter list: `@@||localhost` Here's where to find your filter list:
  * Brave: `brave://settings/shields/filters`
  * Ublock Origin 
    * Open the extension settings
    * Go to the "My Filters" tab


**Windows Firewall**
The first time you run any adapter it will give you a firewall popup.  
If you deny it, you will have to allow the app manually.  
Search for "Allow an app through the Windows Firewall" and open the program.  
Press "Change settings" on the top right of the window and search for or add the program you want to allow; you'll want to allow both private and pubic networks.  
Example: for Rainmeter, it would look like this:  
![rainmeter firewall settings](https://wnp.keifufu.dev/assets/rainmeter-firewall-settings.88c52d64.jpg)
## Amazon music bmw [​](https://wnp.keifufu.dev/troubleshooting#amazon-music-bmw)
If you're having trouble using amazon music on car screen with your bmw x4 g02 nbtevo_id5 (v1.3.2-23-410d8c), please refer to 
## Ask for help [​](https://wnp.keifufu.dev/troubleshooting#ask-for-help)

---

<a id="https-wnp-keifufu-dev-spicetify"></a>

## https://wnp.keifufu.dev/spicetify

| Source | `https://wnp.keifufu.dev/spicetify` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/spicetify#VPContent)
Menu
Return to top
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 


# Spicetify [​](https://wnp.keifufu.dev/spicetify#spicetify)
**Note:** This information is only relevant only if you use the Rainmeter Plugin.
Spicetify is a modification for Spotify Desktop that allows you to customize the official Spotify client. It allows the injection of extensions and themes.
It was previously used to connect WebNowPlaying with Spotify Desktop.
With version 2.0.0 and newer, WebNowPlaying can directly interact with Spotify Desktop, and **Spicetify is no longer needed**.
If you were instructed to install Spicetify for WebNowPlaying and you are using v2.0.0 or a newer version, please uninstall Spicetify and update your WebNowPlaying plugin.
Ideally, use Spotify's website instead of their desktop app for the best experience.
If you can't use WebNowPlaying version 2.0.0 and/or wish to continue using Spicetify, downgrade to [v1.2.0](https://wnp.keifufu.dev/rainmeter/changelog#v1-2-0) of the plugin.

---

<a id="https-wnp-keifufu-dev-rainmeter-usage"></a>

## https://wnp.keifufu.dev/rainmeter/usage

| Source | `https://wnp.keifufu.dev/rainmeter/usage` |
|---|---|
| Depth | 2 |

[ Skip to content ](https://wnp.keifufu.dev/rainmeter/usage#VPContent)
Menu
On this page 
Sidebar Navigation 
## Introduction
[What is WebNowPlaying? ](https://wnp.keifufu.dev/what-is-webnowplaying)
[Quickstart ](https://wnp.keifufu.dev/quickstart)
[Supported Sites ](https://wnp.keifufu.dev/supported-sites)
[Desktop Players ](https://wnp.keifufu.dev/desktop-players)
[Spicetify ](https://wnp.keifufu.dev/spicetify)
## Browser Extension
[Getting Started ](https://wnp.keifufu.dev/extension/getting-started)
[Settings ](https://wnp.keifufu.dev/extension/settings)
[Changelog ](https://wnp.keifufu.dev/extension/changelog)
## Rainmeter Plugin
[Getting Started ](https://wnp.keifufu.dev/rainmeter/getting-started)
[Usage ](https://wnp.keifufu.dev/rainmeter/usage)
[Changelog ](https://wnp.keifufu.dev/rainmeter/changelog)
## OBS Script
[Getting Started ](https://wnp.keifufu.dev/obs/getting-started)
[Changelog ](https://wnp.keifufu.dev/obs/changelog)
## CLI
[Getting Started ](https://wnp.keifufu.dev/cli/getting-started)
[Changelog ](https://wnp.keifufu.dev/cli/changelog)
## Creating Adapters
[Getting Started ](https://wnp.keifufu.dev/creating-adapters/getting-started)
[Adapter Library ](https://wnp.keifufu.dev/creating-adapters/adapter-library)
[Troubleshooting ](https://wnp.keifufu.dev/troubleshooting)
On this page
Table of Contents for current page 
  * [Options](https://wnp.keifufu.dev/rainmeter/usage#options "Options")
  * [Bangs](https://wnp.keifufu.dev/rainmeter/usage#bangs "Bangs")
  * [Example](https://wnp.keifufu.dev/rainmeter/usage#example "Example")


On this page 
# Usage [​](https://wnp.keifufu.dev/rainmeter/usage#usage)
If you already know how to use NowPlaying, then WebNowPlaying is basically just a drop-in replacement. There are minor changes to some bangs and new measures listed below.
## Options [​](https://wnp.keifufu.dev/rainmeter/usage#options)
PlayerType
Type of the measure value. Valid values are:
  * `Status`: 0 for inactive (no connections) and 1 for active (1 or more connections).
  * `Player`: Player Name (e.g: YouTube, Spotify).
  * `Title`: Track title.
  * `Artist`: Track artist.
  * `Album`: Track album.
  * `Cover`: Path to cover art.
  * `CoverWebAddress`: URL for cover art.
  * `Duration`: Total length of track in seconds.
  * `Position`: Current position in track in seconds.
  * `Remaining`: Remaining time of track in seconds.
  * `Progress`: Percentage of track completed.
  * `Volume`: From 0 to 100
  * `State`: 0 for stopped, 1 for playing, and 2 for paused.
  * `Rating`: Rating of current track (0 to 5).
  * `Repeat`: 0 if repeat/loop track is off, 1 if repeating one track, 2 if repeating all.
  * `Shuffle`: 0 if shuffle/random tracks is off, 1 if on.
  * `SupportsPlayPause`: 0 or 1 if the current media supports !PlayPause.
  * `SupportsSkipPrevious`: 0 or 1 if the current media supports !Previous.
  * `SupportsSkipNext`: 0 or 1 if the current media supports !Next.
  * `SupportsSetPosition`: 0 or 1 if the current media supports !SetPosition.
  * `SupportsSetVolume`: 0 or 1 if the current media supports !SetVolume.
  * `SupportsToggleRepeatMode`: 0 or 1 if the current media supports !Repeat.
  * `SupportsToggleShuffleActive`: 0 or 1 if the current media supports !Shuffle.
  * `SupportsSetRating`: 0 or 1 if the current media supports !SetRating.
  * `RatingSystem`: 0 for None, 1 for Like, 2 for Like-Dislike, 3 for Scale (0-5).
  * `IsUsingNativeAPIs`: 1 if the user has "Use Native APIs" enabled, 0 if not.


**Notes:**
With measures of type `Duration` or `Position`, the string value is in the `(HH)::MM::SS` and the number value is the actual number of seconds.
Measure of the type `Cover` have an additional option:
  * `DefaultPath`, A system path to the image to show when there is nothing playing or when there is no cover available.


## Bangs [​](https://wnp.keifufu.dev/rainmeter/usage#bangs)
Bangs
WebNowPlaying measures can be controlled with the `!CommandMeasure` bang with the argument parameter being:
  * `Play`: Play the current track.
  * `Pause`: Pause the current track.
  * `PlayPause`: Play (if stopped/paused) or pause (if playing) current track.
  * `Next`: Change to next track.
  * `Previous`: Change to previous track.
  * `Repeat`: Toggle repeat mode.
  * `Shuffle`: Toggle shuffle mode.
  * `ToggleThumbsUp`: Sets rating to `5` or `0`.
  * `ToggleThumbsDown`: Sets rating to `1` or `0`.
  * `SetRating n`: where _n_ is a value between `0` (no rating) and `5` (maximum rating).
  * `SetPosition n`: where _n_ is either an absolute value (`SetPosition 50` to jump 50% of the track) or a relative value (`SetPosition +5` to jump 5% forward or `SetPosition -10` to jump 10% backward).
  * `SetVolume n`: where _n_ is either an absolute value (`SetVolume 50` to set volume to 50%) or a relative volume (`SetVolume +20` to increase volume by 20% or `SetVolume -40` to decrease volume by 40%).


## Example [​](https://wnp.keifufu.dev/rainmeter/usage#example)
For a more complete example, check the 
ini
```
[Rainmeter]
Update=1000
BackgroundMode=2
SolidColor=0,0,0,255

[MeasureTitle]
Measure=Plugin
Plugin=WebNowPlaying
PlayerType=Title

[MeasureArtist]
Measure=Plugin
Plugin=WebNowPlaying
PlayerType=Artist

[MeasureAlbum]
Measure=Plugin
Plugin=WebNowPlaying
PlayerType=Album

[MeterPrev]
Meter=String
X=5
Y=5
FontColor=FFFF00
Text="Prev"
# The measure to perform the Bang on does not matter,
# it can be any WebNowPlaying measure.
LeftMouseUpAction=[!CommandMeasure "MeasureTitle" "Previous"]

[MeterNext]
Meter=String
X=20R
Y=5
FontColor=FFFF00
Text="Next"
LeftMouseUpAction=[!CommandMeasure "MeasureTitle" "Next"]

[MeterTitle]
Meter=String
MeasureName=MeasureTitle
X=5
Y=35
W=400
H=20
FontColor=255,255,255,255
Text="Title: %1"

[MeterArtist]
Meter=String
MeasureName=MeasureArtist
X=5
Y=55
W=400
H=20
FontColor=255,255,255,255
Text="Artist: %1"

[MeterAlbum]
Meter=String
MeasureName=MeasureAlbum
X=5
Y=75
W=400
H=20
FontColor=255,255,255,255
Text="Album: %1"
```

---

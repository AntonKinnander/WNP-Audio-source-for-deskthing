# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Purpose

This directory contains reference implementations of WebNowPlaying (WNP) adapters. These examples demonstrate how to integrate with the WNP protocol and browser extension.

## WNP Protocol Overview

WNP (WebNowPlaying) is a protocol for reading and controlling media players:
- **Browser Extension**: Runs in the browser, detects media from web players (YouTube, Spotify, etc.)
- **Adapters**: Local servers that connect to the extension to receive metadata and send controls
- **Connection Flow**: Browser Extension → Adapter connects to localhost:PORT

Each adapter uses a unique port to avoid conflicts:
- Default WNP port: 6534
- Official adapters each have assigned ports

## Examples

### 1. mondtholomew-main
- **Language**: Rust
- **Purpose**: A standalone WNP player application
- **Key Files**:
  - `src/` - Main application logic
  - `build.ps1` - Windows build script
- **Features**: Demonstrates a complete WNP-integrated player

### 2. WebNowPlaying-CLI-main
- **Language**: C/C++
- **Purpose**: Command-line interface for WNP
- **Usage**:
  ```bash
  wnpcli start-daemon      # Start the daemon
  wnpcli metadata [key]    # Get metadata
  wnpcli play-pause        # Toggle playback
  ```
- **Install**: Download from Releases or use Nix

### 3. WebNowPlaying-OBS-main
- **Language**: Python (with pywnp library)
- **Purpose**: OBS Studio script for displaying WNP metadata
- **Key Code**:
  ```python
  from pywnp import WNPRedux
  WNPRedux.start(port, version, logger)
  # Access: WNPRedux.media_info.title, artist, album, etc.
  ```
- **Dependencies**: `pip install pywnp`

### 4. WebNowPlaying-Rainmeter-main
- **Language**: Lua (Rainmeter plugin)
- **Purpose**: Display WNP metadata in Rainmeter skins
- **Key Pattern**: Uses WebNowPlaying.lua plugin for communication

### 5. WebNowPlaying-Redux-Macro-Deck-master
- **Purpose**: Macro Deck integration (physical button controller)

## Common Patterns

### Starting a WNP Adapter
Most adapters follow this pattern:
1. Start a WebSocket/server on a specific port
2. Register with WNP protocol with version info
3. Listen for incoming metadata from browser extension
4. Expose control methods (play, pause, skip, etc.)

### Metadata Available
- `title` - Track title
- `artist` - Artist name(s)
- `album` - Album name
- `duration` - Track length
- `position` - Current position
- `position_percent` - Position as percentage (0-100)
- `cover_url` - Album art URL
- `player_name` - Source player name
- State: `is_playing`, `is_paused`

### Control Commands
- `play` / `pause` / `play-pause`
- `skip-next` / `skip-previous`
- `set-position` (seek)
- `set-volume` (0-100)
- `set-shuffle` (0/1)
- `set-repeat` (NONE/ALL/ONE)

## Reference for Deskthing Adapter

When building the Deskthing WNP adapter, reference:
- **pywnp (OBS example)**: For Python library usage patterns
- **CLI example**: For C/C++ implementation patterns
- **Mondtholomew**: For a complete player implementation

## Port Assignments

This project uses port **6344** for the Deskthing WNP adapter (officially assigned).

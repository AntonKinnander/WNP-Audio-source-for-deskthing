# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Purpose

This directory contains reference implementations of Deskthing apps. These examples demonstrate how to build apps that integrate with the Deskthing server using the `@deskthing/server` SDK.

## Deskthing App Architecture

### Project Structure
```
app-name/
├── server/              # Backend code (Node.js/TypeScript)
│   ├── index.ts         # Main entrypoint: START/STOP/PURGE handlers
│   ├── initializer.ts   # Sets up event listeners
│   ├── mediaStore.ts    # MediaStore singleton for state management
│   └── [other logic]
├── src/                 # Frontend code (React/Vite)
├── deskthing/           # App metadata
│   └── manifest.json    # App configuration
├── deskthing.config.ts  # Dev/prod configuration
├── package.json
└── vite.config.ts
```

### Key SDK Patterns

**@deskthing/server** provides:
```typescript
import { DeskThing } from "@deskthing/server"
import { DESKTHING_EVENTS, SongEvent, AUDIO_REQUESTS } from "@deskthing/types"

// Lifecycle events
DeskThing.on(DESKTHING_EVENTS.START, start)   // App startup
DeskThing.on(DESKTHING_EVENTS.STOP, stop)     // App shutdown
DeskThing.on(DESKTHING_EVENTS.PURGE, purge)   // Clean reset

// Music events
DeskThing.on(SongEvent.GET, async (data) => {
  // data.request: AUDIO_REQUESTS.SONG, REFRESH
})
DeskThing.on(SongEvent.SET, async (data) => {
  // data.request: AUDIO_REQUESTS.PLAY, PAUSE, NEXT, PREVIOUS, etc.
  // data.payload: control data (volume amount, seek position, etc.)
})

// Send data to Deskthing
DeskThing.sendSong(songData: SongData11)
```

## Audio App Reference

The `audio/` app is the canonical reference for building audio source apps:

### MediaStore Pattern
```typescript
export class MediaStore {
  private static instance: MediaStore;
  private player: NowPlayingType;
  private nowPlayingInfo: NowPlayingMessage | undefined;

  public static getInstance(): MediaStore { /* singleton */ }
  public async initializeListeners() { /* subscribe to media */ }
  public async handleGetSong() { /* send current state */ }
  public async handleRefresh() { /* refresh and send */ }

  // Control handlers
  public handlePlay() { this.player.play() }
  public handlePause() { this.player.pause() }
  public handleNext() { this.player.nextTrack() }
  // ... etc
}
```

### SongData11 Format
```typescript
interface SongData11 {
  version: 2
  source: string              // 'local', 'spotify', etc.
  track_name: string
  album: string | null
  artist: string | null
  is_playing: boolean
  track_duration: number | null   // milliseconds
  track_progress: number | null   // milliseconds
  volume: number
  thumbnail: string | null        // URL or base64
  abilities: SongAbilities[]      // What controls are available
  // ... additional fields
}
```

## Commands

```bash
npm run dev          # Start dev server (Vite + Deskthing CLI)
npm run dev:wrapper  # Deskthing wrapper only
npm run dev:vite     # Vite dev server only
npm run build        # Package app for distribution
npm run lint         # Run ESLint
```

## App Manifest (manifest.json)

```json
{
  "id": "unique-app-id",
  "label": "Display Name",
  "version": "0.11.2",
  "description": "App description",
  "author": "Author Name",
  "platforms": ["windows", "linux", "mac"],
  "tags": ["audiosource"],     // Categorizes the app
  "requires": [],              // Dependencies
  "requiredVersions": {
    "server": ">=0.11.13",
    "client": ">=0.11.2"
  }
}
```

## Other Examples

- `spotify/` - Spotify integration (premium account required)
- `exampleapp/` - Minimal template app
- `settingstest/` - Settings UI demonstration

## Key Difference: Local Audio vs. WNP Adapter

The `audio/` app uses `node-nowplaying` to get media from the **local OS** (Windows Media Foundation, MPRIS on Linux, etc.).

Our WNP adapter will differ by:
- Receiving data from **browser extension** on localhost:6344
- Implementing a WNP server instead of polling OS media
- Same MediaStore pattern, different data source

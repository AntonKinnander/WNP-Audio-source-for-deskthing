# WNP Audio Source for Deskthing

A Deskthing audio source adapter that receives music metadata from the WebNowPlaying (WNP) browser extension.

## Overview

This app enables Deskthing to display song information from web browsers by running a WNP-compatible server on port 6344. The WNP browser extension connects to this adapter and pushes real-time music metadata.

It offers significantly less perceived latency than the standard Local Audio source.

## Features

Gets much better data for playing media, including:
- Play, Pause, and Skip tracks
- **Higher quality thumbnails**
- Support for **Shuffle** and **Repeat**
- Timeline **Scrubbing**
- **Adjusting the volume** of the player

## Required Browser Extension

To use this adapter, you **must install** the awesome Web Now Playing (WNP) extension in your browser.

- [WNP for Chrome](https://chromewebstore.google.com/detail/webnowplaying/jfakgfcdgpghbbefmdfjkbdlibjgnbli)
- [WNP for Firefox](https://addons.mozilla.org/en-US/firefox/addon/webnowplaying/)

## Data Flow

```
Browser playing music → WNP Browser Extension → localhost:6344 → WNP Adapter → Deskthing Interface
```

## Development

```bash
npm run dev     # Start development server
npm run build   # Package the app
npm run lint    # Run ESLint
```

## Project Structure

- `server/` - Backend TypeScript code
- `src/` - Frontend UI code
- `deskthing/` - App metadata and assets
- `dist/` - Build output

## Port Configuration

- **Port 6344** - Officially assigned WNP adapter port

## License

MIT

# WNP Audio Source for Deskthing

**One-liner**: An official WebNowPlaying adapter that displays browser-based music metadata in Deskthing.

## Problem

Deskthing has a local audio source (node-nowplaying) for OS media controls, but no way to display music from web browsers (YouTube, Spotify Web, etc.). The WNP browser extension solves this by exposing web player metadata via localhost - we need to bridge this to Deskthing.

## Success Criteria

How we know it worked:

- [ ] Deskthing displays title, artist, album from web players
- [ ] Cover art thumbnail displays correctly
- [ ] Duration/position progress updates in real-time
- [ ] Playing state (play/pause indicator) reflects browser
- [ ] App installs and runs on any platform with Chrome/Chromium

## Constraints

- **Port**: 6344 (officially assigned WNP adapter port)
- **Tech**: TypeScript/Node.js with @deskthing/server SDK
- **Pattern**: Follow `Deskthing-app-examples/audio/` structure
- **Approach**: YAGNI - metadata only for v1, controls deferred

## Out of Scope

What we're NOT building (prevents scope creep):

- Playback controls (play/pause/skip/seek) - v2
- Volume control - v2
- Shuffle/repeat state - v2
- Rating/like functionality - v2
- Desktop player support (web players only)
- Custom WNP library (use existing patterns)

## Data Flow

```
Browser (YouTube/Spotify Web) → WNP Extension → localhost:6344 → Our Adapter → Deskthing Client → Display
```

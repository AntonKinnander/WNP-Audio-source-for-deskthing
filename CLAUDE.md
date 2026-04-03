# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This project is building an official WebNowPlaying (WNP) audio source adapter for Deskthing. The adapter enables Deskthing to receive song information from web browsers through the WNP browser extension.

**Flow of data:**
```
Browser playing music → WNP Browser Extension → localhost:6344 → Our WNP Adapter → Deskthing Interface
```

**Analogy:** Similar to how Mondtholomew player interacts with WNP through the Rainmeter WNP adapter.

## Architecture

### Project Structure

```
/
├── WNP-Examples/          # Reference WNP adapter implementations
│   ├── mondtholomew-main/      # Rust WNP player
│   ├── WebNowPlaying-CLI-main/ # CLI adapter
│   ├── WebNowPlaying-OBS-main/ # OBS Python adapter (uses pywnp)
│   └── WebNowPlaying-Rainmeter-main/ # Rainmeter Lua adapter
├── Deskthing-app-examples/ # Reference Deskthing app implementations
│   ├── audio/            # Local audio source (our reference implementation)
│   │   ├── server/       # Backend code using @deskthing/server SDK
│   │   │   ├── index.ts       # Main entrypoint, START/STOP/PURGE handlers
│   │   │   ├── initializer.ts # Sets up event listeners
│   │   │   ├── mediaStore.ts  # MediaStore class managing state & controls
│   │   │   ├── nowplayingWrapper.ts # Wrapper for node-nowplaying (local OS media)
│   │   │   └── settings.ts    # Configuration
│   │   └── deskthing/    # App manifest and assets
│   │       └── manifest.json
│   └── [other examples]
└── Documentation/         # WNP and Deskthing docs
    ├── wnp_docs_combined_2.md
    ├── docs_combined_carthing_2.md
    └── WNP-Protocol-Findings.md  # Reverse-engineered WNP protocol research
```

### Key Concepts

**Deskthing App Structure:**
- Apps are TypeScript/Node.js projects with a `server/` directory for backend logic
- `@deskthing/server` SDK provides `DeskThing.on(event, handler)` for event-driven architecture
- `MediaStore` pattern: Singleton class that manages music state, handles GET/SET events
- Events: `SongEvent.GET` (song, refresh), `SongEvent.SET` (play, pause, next, etc.)
- Apps communicate via `DeskThing.sendSong(payload)` to send SongData11 to the Deskthing server

**WebNowPlaying Protocol:**
- WNP browser extension connects to localhost on specified ports
- Default port: 6534 (not used by us)
- **Our port: 6344** (assigned as official WNP adapter)
- Adapters like pywnp use `WNPRedux.start(port, version, logger)` to start the server
- The extension pushes metadata (title, artist, album, cover, position, etc.) to connected adapters

**Our Adapter's Role:**
- Replaces `nowplayingWrapper.ts` (which uses node-nowplaying for local OS media)
- Will implement WNP server to receive data from browser extension
- Translates WNP protocol to Deskthing's SongData11 format
- Handles bidirectional: receive metadata + send controls (play/pause/skip)

## Development Workflow

### 1. Plan First
Before implementing, always create a plan using the planning skill. Understand:
- What needs to be built
- How WNP protocol works
- How Deskthing expects data

### 2. Consult WNP Documentation
Use the `notebooklm` skill to query WNP documentation:
- The expert has comprehensive WNP documentation
- Documentation may be incomplete, so cross-reference with examples
- Use for protocol details, message formats, port configuration
- **Also see:** `Documentation/WNP-Protocol-Findings.md` - Reverse-engineered protocol research with message formats, event types, and communication flow

### 3. Reference Examples
When uncertain, spawn a subagent to research:
- `WNP-Examples/` - For WNP adapter patterns
- `Deskthing-app-examples/audio/` - For Deskthing app patterns
- Always delegate research to subagents, never do it yourself

### 4. Key Differences from Reference Implementation
- `Deskthing-app-examples/audio/` uses `node-nowplaying` (local OS media controls)
- Our adapter uses WNP (browser extension connection on localhost:6344)
- We receive data FROM the browser extension (it connects to us)
- They poll local OS media state

## Commands

### Deskthing App Development
```bash
# In Deskthing-app-examples/audio/ or new app directory
npm run dev              # Start dev server with hot reload
npm run build            # Package the app
npm run lint             # Run ESLint
```

### WNP Examples
Each example has its own build/run pattern - check individual READMEs:
- mondtholomew: Rust + Cargo
- OBS: Python script + pywnp pip package
- CLI: Installed binary or Nix

## Important Notes

- Port 6344 is officially assigned for this adapter - do not change
- The WNP browser extension initiates the connection to our adapter
- Audio in Deskthing-app-examples is a LOCAL audio source - we're building the WNP equivalent
- Always use subagents for research tasks
- The `notebooklm` skill has WNP documentation - use it as your primary reference

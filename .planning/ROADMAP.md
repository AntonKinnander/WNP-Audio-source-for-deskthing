# Roadmap: WNP Audio Source for Deskthing

## Overview

Building an official WebNowPlaying adapter that enables Deskthing to display music metadata from web browsers. The app runs a WNP-compatible server on port 6344, receives data from the browser extension, and translates it to Deskthing's SongData11 format.

## Phases

- [ ] **Phase 1: Research** - Understand WNP protocol and communication patterns
- [x] **Phase 2: Project Setup** - Create Deskthing app scaffold
- [x] **Phase 3: WNP Server** - Implement server on port 6344 to receive browser data
- [x] **Phase 4: Data Translation** - Convert WNP messages to SongData11
- [x] **Phase 5: Testing** - End-to-end verification
---
- [ ] **Phase 6: Basic Controls** - Play/Pause/Skip from Deskthing to WNP
- [ ] **Phase 7: Shuffle & Loop** - Toggle shuffle and repeat modes
- [ ] **Phase 8: Volume** - Sync and control volume
- [ ] **Phase 9: Refinements** - UI polish and toggle detection

## Phase Details

### Phase 1: Research
**Goal**: Understand how WNP browser extension communicates with adapters
**Depends on**: Nothing (first phase)
**Plans**: 2 plans

Plans:
- [ ] 01-01: Analyze WNP protocol documentation and examples
- [ ] 01-02: Document WNP message format and data fields

### Phase 2: Project Setup
**Goal**: Create Deskthing audio source app structure
**Depends on**: Phase 1
**Plans**: 3 plans

Plans:
- [x] 02-01: Initialize project (package.json, tsconfig, folder structure)
- [x] 02-02: Create manifest.json (audio source type, port 6344)
- [x] 02-03: Set up build configuration (vite, esbuild, deskthing.config.ts)

### Phase 3: WNP Server
**Goal**: Implement server that receives data from browser extension
**Depends on**: Phase 2
**Plans**: 2 plans

Plans:
- [x] 03-01: Implement WebSocket/server on port 6344
- [x] 03-02: Handle WNP connection and message parsing

### Phase 4: Data Translation
**Goal**: Convert WNP messages to Deskthing SongData11 format
**Depends on**: Phase 3
**Plans**: 2 plans

Plans:
- [x] 04-01: Create WNP → SongData11 mapping functions
- [x] 04-02: Integrate with Deskthing SDK (sendSong, event listeners)

### Phase 5: Testing
**Goal**: Verify end-to-end functionality
**Depends on**: Phase 4
**Plans**: 2 plans

Plans:
- [x] 05-01: Test with actual browser extension (YouTube, Spotify Web)
- [x] 05-02: Verify all metadata displays in Deskthing UI

### Phase 6: Basic Controls
**Goal**: Implement Play/Pause/Skip controls from Deskthing to WNP
**Depends on**: Phase 5
**Plans**: 2 plans

Plans:
- [ ] 06-01: Implement control handlers in MediaStore
- [ ] 06-02: Wire controls to WNP server, verify bidirectional flow

### Phase 7: Shuffle & Loop
**Goal**: Toggle shuffle and repeat modes from Deskthing
**Depends on**: Phase 6
**Plans**: 2 plans

Plans:
- [ ] 07-01: Implement shuffle toggle handler
- [ ] 07-02: Implement repeat (loop) toggle handler with 3-state support

### Phase 8: Volume
**Goal**: Sync player volume and enable volume control from Deskthing
**Depends on**: Phase 7
**Plans**: 2 plans

Plans:
- [ ] 08-01: Track and sync WNP volume to Deskthing
- [ ] 08-02: Implement volume control handler

### Phase 9: Refinements
**Goal**: UI polish and toggle detection improvements
**Depends on**: Phase 8
**Plans**: 2 plans

Plans:
- [ ] 09-01: Detect shuffle toggle from player state changes
- [ ] 09-02: UI refinements and final testing

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Research | 0/2 | **Plans Created** | 01-01-PLAN.md, 01-02-PLAN.md |
| 2. Project Setup | 3/3 | **COMPLETE** | 02-01-PLAN.md [DONE], 02-02-PLAN.md [DONE], 02-03-PLAN.md [DONE] |
| 3. WNP Server | 2/2 | **COMPLETE** | 03-01-PLAN.md [DONE], 03-02-PLAN.md [DONE] |
| 4. Data Translation | 2/2 | **COMPLETE** | 04-01-PLAN.md [DONE], 04-02-PLAN.md [DONE] |
| 5. Testing | 2/2 | **COMPLETE** | 05-01-PLAN.md [DONE], 05-02-PLAN.md [DONE] |
| 6. Basic Controls | 0/2 | **Plans Created** | 06-01-PLAN.md, 06-02-PLAN.md |
| 7. Shuffle & Loop | 0/2 | **Plans Created** | 07-01-PLAN.md, 07-02-PLAN.md |
| 8. Volume | 0/2 | **Plans Created** | 08-01-PLAN.md, 08-02-PLAN.md |
| 9. Refinements | 0/2 | **Plans Created** | 09-01-PLAN.md, 09-02-PLAN.md |

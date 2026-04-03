# Roadmap: WNP Audio Source for Deskthing

## Overview

Building an official WebNowPlaying adapter that enables Deskthing to display music metadata from web browsers. The app runs a WNP-compatible server on port 6344, receives data from the browser extension, and translates it to Deskthing's SongData11 format.

## Phases

- [ ] **Phase 1: Research** - Understand WNP protocol and communication patterns
- [x] **Phase 2: Project Setup** - Create Deskthing app scaffold
- [x] **Phase 3: WNP Server** - Implement server on port 6344 to receive browser data
- [ ] **Phase 4: Data Translation** - Convert WNP messages to SongData11
- [ ] **Phase 5: Testing** - End-to-end verification

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
- [ ] 04-01: Create WNP → SongData11 mapping functions
- [ ] 04-02: Integrate with Deskthing SDK (sendSong, event listeners)

### Phase 5: Testing
**Goal**: Verify end-to-end functionality
**Depends on**: Phase 4
**Plans**: 2 plans

Plans:
- [ ] 05-01: Test with actual browser extension (YouTube, Spotify Web)
- [ ] 05-02: Verify all metadata displays in Deskthing UI

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Research | 0/2 | **Plans Created** | 01-01-PLAN.md, 01-02-PLAN.md |
| 2. Project Setup | 3/3 | **COMPLETE** | 02-01-PLAN.md [DONE], 02-02-PLAN.md [DONE], 02-03-PLAN.md [DONE] |
| 3. WNP Server | 2/2 | **COMPLETE** | 03-01-PLAN.md [DONE], 03-02-PLAN.md [DONE] |
| 4. Data Translation | 0/2 | **Plans Created** | 04-01-PLAN.md, 04-02-PLAN.md |
| 5. Testing | 0/2 | **Plans Created** | 05-01-PLAN.md, 05-02-PLAN.md |

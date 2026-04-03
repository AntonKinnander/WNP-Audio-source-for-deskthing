# WNP WebSocket Protocol Research Findings

## Executive Summary

Research conducted on the WebNowPlaying (WNP) protocol by examining:
1. OBS adapter implementation (pywnp-based Python script)
2. CLI adapter implementation (C daemon)
3. Rainmeter adapter implementation (C DLL)
4. Official WNP documentation
5. WebSocket client-side implementation (JavaScript widget)

---

## 1. Connection Architecture

### Connection Flow
```
Browser Extension (initiator) --> WebSocket --> Adapter Server (listener on localhost:PORT)
```

**Key Points:**
- Browser extension initiates the WebSocket connection
- Adapter server runs on localhost at a specific port (each adapter has unique port)
- Our assigned port: **6344** (officially designated for Deskthing adapter)
- Default WNP port: 6534 (used by OBS adapter in examples)

### Connection Handshake
1. Adapter starts WebSocket server on designated port
2. Browser extension connects to `ws://localhost:PORT`
3. Upon successful connection, client sends **"RECIPIENT"** string to register as a recipient
4. Server then begins receiving media metadata updates

**Evidence from socket.js (widget implementation):**
```javascript
ws.onopen = () => ws.send('RECIPIENT')
```

---

## 2. Message Event Types

### Metadata Update Fields (from pywnp and C implementations)

| Field | Type | Description |
|-------|------|-------------|
| state | string | "playing", "paused", "stopped" |
| player_name | string | Name of the media player |
| title | string | Track title |
| artist | string | Artist name(s) |
| album | string | Album name |
| cover_url | string | URL to album artwork |
| duration | string | Duration in "M:SS" format |
| duration_seconds | number | Duration in seconds |
| position | string | Current position in "M:SS" format |
| position_seconds | number | Current position in seconds |
| position_percent | number | Position as percentage (0-100) |
| volume | number | Volume level (0-100) |
| rating | number | Rating value |
| repeat_mode | string | "NONE", "ALL", "ONE" |
| shuffle_active | boolean | Shuffle state |
| timestamp | number | Unix timestamp of update |

### Extended Fields (v3.0.0+)
| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique player identifier |
| cover_src | string | Source of cover image |
| rating_system | string | "none", "like", "like-dislike", "scale" |
| available_repeat | number | Bitmask of available repeat modes |
| can_set_state | boolean | Whether play/pause is supported |
| can_skip_previous | boolean | Whether previous track is supported |
| can_skip_next | boolean | Whether next track is supported |
| can_set_position | boolean | Whether seeking is supported |
| can_set_volume | boolean | Whether volume control is supported |
| can_set_rating | boolean | Whether rating can be set |
| can_set_repeat | boolean | Whether repeat mode can be set |
| can_set_shuffle | boolean | Whether shuffle can be set |
| created_at | number | Timestamp when player was created |
| updated_at | number | Timestamp when player was last updated |
| active_at | number | Timestamp when player was last active |
| is_web_browser | boolean | Whether source is web browser |
| platform | enum | "none", "web", "linux", "darwin", "windows" |

---

## 3. JSON Payload Structure

### Legacy Format (v1.x)
Keys were capitalized: `State`, `Player`, `Title`, `Artist`, etc.

### Current Format (v2.x/v3.x)
Keys are lowercase snake_case: `state`, `player_name`, `title`, etc.

### Default State Object
When no media is playing or connection is lost, adapters return a default state:
```json
{
  "state": "STOPPED",
  "player_name": "",
  "title": "",
  "artist": "",
  "album": "",
  "cover_url": "",
  "duration": "0:00",
  "duration_seconds": 0,
  "position": "0:00",
  "position_seconds": 0,
  "position_percent": 0,
  "volume": 100,
  "rating": 0,
  "repeat_mode": "NONE",
  "shuffle_active": false,
  "timestamp": 0
}
```

---

## 4. Communication Flow Diagram

```
┌─────────────────┐                    ┌─────────────────┐
│  Browser        │                    │  Adapter        │
│  Extension      │                    │  (Port 6344)    │
└────────┬────────┘                    └────────┬────────┘
         │                                     │
         │ 1. WebSocket Connect Request        │
         │────────────────────────────────────>│
         │                                     │
         │ 2. Connection Established           │
         │<────────────────────────────────────│
         │                                     │
         │ 3. Send "RECIPIENT" handshake        │
         │────────────────────────────────────>│
         │                                     │
         │ 4. Send Current Media State         │
         │<────────────────────────────────────│
         │                                     │
         │ 5. Media Update (on change)         │
         │<────────────────────────────────────│
         │                                     │
         │ 6. Control Command (optional)        │
         │────────────────────────────────────>│
         │                                     │
         │ 7. Event Result                     │
         │<────────────────────────────────────│
```

---

## 5. Control Commands (Adapter → Browser)

### Playback Controls
- `play` - Start playback
- `pause` - Pause playback
- `play-pause` - Toggle playback
- `set-state` - Set specific state (playing/paused/stopped)

### Navigation
- `skip-next` - Skip to next track
- `skip-previous` - Skip to previous track

### Position/Seeking
- `set-position` - Seek to position (seconds or percent)
- `forward` - Seek forward by seconds
- `revert` - Seek backward by seconds

### Volume
- `set-volume` - Set volume (0-100)

### Playback Options
- `set-repeat` - Set repeat mode (NONE/ALL/ONE)
- `toggle-repeat` - Cycle through repeat modes
- `set-shuffle` - Set shuffle (true/false)

### Rating
- `set-rating` - Set rating value

---

## 6. Event System (v3.0.0+)

### Event Results
Commands now return event results:
- `PENDING` - Event is queued
- `SUCCEEDED` - Command executed successfully
- `FAILED` - Command failed

### Event Flow
1. Adapter sends control command with player ID
2. Extension queues the event
3. Adapter receives event ID
4. Adapter can wait for result using event ID
5. Extension sends result when complete

---

## 7. State Management Approach

### pywnp Library Pattern (Python/OBS)
- `WNPRedux.start(port, version, logger)` - Initializes server
- `WNPRedux.media_info` - Object containing current state
- `WNPRedux.is_started` - Boolean status flag
- Poll-based: Adapter checks `media_info` periodically (250ms in OBS example)
- State changes trigger callbacks

### C Library Pattern (CLI/Rainmeter)
- `wnp_init(&args)` - Initialize with callbacks
- Callback functions for events:
  - `on_player_added`
  - `on_player_updated`
  - `on_player_removed`
  - `on_active_player_changed`
- Functions return `wnp_player_t` struct with all fields
- Lock/unlock pattern for thread safety

### Multi-Player Support (v3.x)
- Each player has unique ID
- `-1` or "active" refers to currently active player
- Adapter can query specific player by ID
- Extension sends updates for ALL players, not just active

---

## 8. Metadata Update Pattern

### Update Triggers
Browser extension sends updates when:
- Track changes (title, artist, album, cover)
- Playback state changes (play/pause/stop)
- Position changes (periodic, typically every second)
- Volume changes
- Shuffle/repeat mode changes
- Player becomes active/inactive

### Update Frequency
- Position/time: Approximately once per second during playback
- State/metadata: Immediate on change
- No explicit heartbeat mechanism

### Connection Recovery
- Automatic retry on disconnect (observed in socket.js)
- 5-second timeout for connection establishment
- Default state sent while disconnected

---

## 9. Key Protocol Differences by Version

### v1.x → v2.x Changes
- Added Desktop Players support (Windows MTC)
- Updated to revision 2 of communication protocol
- Lowercase keys instead of capitalized

### v2.x → v3.x Changes
- Events return success/failure status
- Multiple player support (send all players, not just active)
- Can send commands to specific players by ID
- Players report available repeat modes
- Direct setting of repeat/shuffle (not just toggle)

---

## 10. Adapter Registration

### Port Assignment
- Each adapter requires unique port
- Port must be registered/assigned before submitting
- Cannot be changed after submission
- Format: `web_port` parameter in initialization

### Version String
- Adapter reports version string to extension
- Used for compatibility checking
- Format: "major.minor.patch" (e.g., "2.0.0")

### Submission Requirements (for official adapters)
- Must be open-source on GitHub
- Published via GitHub Releases
- Proper version tagging (vmajor.minor.patch or major.minor.patch)
- Repository named "WebNowPlaying-name"
- Unique port assignment

---

## 11. Technical Implementation Notes

### WebSocket Library Requirements
- Must support standard WebSocket protocol (ws://)
- Must handle connection lifecycle (open, message, close, error)
- Should support automatic reconnection

### Threading Considerations
- Updates come from browser extension asynchronously
- State access should be thread-safe (locks in C implementation)
- Callbacks may be invoked from background threads

### Error Handling
- Graceful degradation when no media playing
- Reconnection on connection loss
- Firewall exceptions may be required (Windows)

---

## 12. Recommended Implementation Approach for Deskthing

### Architecture
1. WebSocket server on port 6344
2. Accept "RECIPIENT" handshake from browser extension
3. Parse JSON metadata updates
4. Convert WNP format to Deskthing SongData11 format
5. Handle control commands from Deskthing interface

### Key Integration Points
- Map WNP state to Deskthing playback states
- Map WNP player_name to Deskthing source identifier
- Handle cover_url for album art (may need proxy/URL handling)
- Implement retry logic for connection drops
- Support both browser and desktop player sources

### State Mapping (WNP → Deskthing)
| WNP Field | Deskthing Equivalent |
|-----------|---------------------|
| state | isPlaying (boolean) |
| title | songTitle |
| artist | artistList |
| album | albumTitle |
| cover_url | artworkUrl |
| duration_seconds | songDuration |
| position_seconds | currentPosition |
| player_name | appName/source |

---

## 13. Open Questions / Unknowns

1. **Authentication**: No evidence of authentication mechanism (localhost only)
2. **Rate Limiting**: No explicit rate limiting observed
3. **Binary Protocol**: All evidence points to JSON-only messages
4. **Browser Extension Source**: Could not access GitHub repository directly (API limits)
5. **Control Message Format**: Exact JSON structure for sending commands not documented

---

## 14. References

### Examined Code
- `WNP-Examples/WebNowPlaying-OBS-main/wnp-obs.py` - pywnp usage
- `WNP-Examples/WebNowPlaying-OBS-main/widgets/scripts/socket.js` - WebSocket client
- `WNP-Examples/WebNowPlaying-CLI-main/src/daemon.c` - C daemon implementation
- `WNP-Examples/WebNowPlaying-Rainmeter-main/src/main.c` - C DLL implementation

### Documentation
- `Documentation/wnp_docs_combined_2.md` - Official WNP documentation
- `WNP-Examples/CLAUDE.md` - Adapter examples reference

### External Resources (need further investigation)
- WebNowPlaying Browser Extension GitHub Repository
- pywnp Python Package Documentation
- WNPReduxAdapterLibrary (C library) Documentation

---

**Research Completed:** 2025-04-03
**Phase:** 01 - Research Plan 01-01
**Next Steps:** Protocol implementation design

---

## 15. CRITICAL DISCOVERY: Actual Message Format (Live Testing)

**⚠️ IMPORTANT: The documentation above describes JSON format, but LIVE TESTING reveals the actual browser extension sends text-based KEY:VALUE messages.**

### Discovered Through Live Testing (YouTube Music, 2025-04-03)

When the WNP browser extension connects to an adapter, it does **NOT** send JSON messages as documented. Instead, it sends individual text messages in `KEY:VALUE` format.

### Actual Protocol Format

```
KEY:VALUE
```

Each field is sent as a separate WebSocket message. For example:
```
PLAYER:YouTube Music
TITLE:Dj Ramezz & Amina " Do You Want It Right Now " 2024 (Eurodance Version)
ARTIST:Dj Ramezz
ALBUM:
COVER:https://i.ytimg.com/vi/6cHowSUMiw/sddefault.jpg
STATE:1
DURATION:4:05
POSITION:0:00
VOLUME:100
RATING:0
REPEAT:0
SHUFFLE:0
```

### Complete Field List

| Field | Format | Example | Description |
|-------|--------|---------|-------------|
| `PLAYER` | `PLAYER:<name>` | `PLAYER:YouTube Music` | Player/source name |
| `TITLE` | `TITLE:<text>` | `TITLE:Song Name` | Track title |
| `ARTIST` | `ARTIST:<text>` | `ARTIST:Artist Name` | Artist name |
| `ALBUM` | `ALBUM:<text>` | `ALBUM:Album Name` | Album name (empty if none) |
| `COVER` | `COVER:<url>` | `COVER:https://...` | Cover art URL |
| `STATE` | `STATE:0/1/2` | `STATE:1` | 0=Stopped, 1=Playing, 2=Paused |
| `DURATION` | `DURATION:M:SS` | `DURATION:3:45` | Duration in minutes:seconds |
| `POSITION` | `POSITION:M:SS` | `POSITION:1:23` | Current position |
| `VOLUME` | `VOLUME:0-100` | `VOLUME:75` | Volume level |
| `RATING` | `RATING:0-5` | `RATING:0` | Rating (0 = not rated) |
| `REPEAT` | `REPEAT:0/1/2` | `REPEAT:0` | 0=None, 1=All, 2=One |
| `SHUFFLE` | `SHUFFLE:0/1` | `SHUFFLE:0` | 0=Off, 1=On |

### Event-to-Action Mapping (Observed from YouTube Music)

| Message Sequence | User Action | Interpretation |
|------------------|-------------|----------------|
| `STATE:0` + `DURATION:0:00` + `POSITION:0:00` | Stop/Close player | Player stopped, no track loaded |
| `STATE:1` + New `TITLE` + `POSITION:0:00` | Play / New Track | Track started from beginning |
| `STATE:2` | Pause | Playback paused |
| `VOLUME:X` (various values) | Volume slider change | Volume updated (21, 76, 100 observed) |
| `REPEAT:0` | Repeat: Off | Repeat disabled |
| `REPEAT:1` | Repeat: All | Repeat all tracks |
| `REPEAT:2` | Repeat: One | Repeat single track |
| `SHUFFLE:0` | Shuffle: Off | Shuffle disabled |
| `SHUFFLE:1` | Shuffle: On | Shuffle enabled |
| `POSITION:0:01`, `0:02`, `0:03`... | Playback progress | Position updates every ~1 second |
| New `TITLE` + `COVER` + `DURATION` + `POSITION:0:00` | Skip to next track | New track loaded |

### State Value Mappings

| Value | State | Description |
|-------|-------|-------------|
| `0` | Stopped | No media playing or player closed |
| `1` | Playing | Active playback |
| `2` | Paused | Playback paused |

### Repeat Mode Mappings

| Value | Mode | Description |
|-------|------|-------------|
| `0` | None | No repeat |
| `1` | All | Repeat all/playlist |
| `2` | One | Repeat single track |

### Shuffle Mappings

| Value | State | Description |
|-------|-------|-------------|
| `0` | Off | Shuffle disabled |
| `1` | On | Shuffle enabled |

### Message Flow Pattern

1. **Connection Established**
   - Client sends: `RECIPIENT`
   - Server acknowledges connection

2. **Initial State Dump** (when media is playing)
   - All fields sent in sequence: `PLAYER`, `TITLE`, `ARTIST`, `ALBUM`, `COVER`, `STATE`, `DURATION`, `POSITION`, `VOLUME`, `RATING`, `REPEAT`, `SHUFFLE`

3. **Position Updates** (during playback)
   - `POSITION:M:SS` sent approximately every second
   - Other fields only sent when changed

4. **State Changes**
   - `STATE` updates immediately on play/pause/stop
   - Track changes trigger full field dump

### Implementation Notes

1. **Accumulate fields**: Since each field arrives as a separate message, the adapter must accumulate them into a complete state object.

2. **Detect updates**: A "complete" update is indicated by receiving the `POSITION` field or when a full set of fields has been received.

3. **Handle partial data**: Some fields (like `ALBUM`) may be empty - still sent but with no value after the colon.

4. **Position updates are frequent**: During playback, only `POSITION` updates are sent (not all fields).

### Why Documentation Mismatch

The JSON format described in sections 1-14 appears to be:
1. The format used by **adapter libraries** (pywnp, C libraries) to present data to applications
2. NOT the raw format sent by the browser extension

The browser extension uses a simpler text-based protocol, and adapter libraries parse this into structured objects for consumption.

---

## 16. Adapter → Extension: Control Commands (Source Code Analysis)

**Researched:** 2026-04-03, from browser extension source at `WNP-Examples/WebNowPlaying-browser-plugin-source/WebNowPlaying-main/src/`

### Protocol Revision Detection (socket.ts)

When the extension connects to an adapter, it starts a **1-second timeout** (`onOpen` at socket.ts:80):
- If the adapter sends `ADAPTER_VERSION X.Y.Z;WNPLIB_REVISION N` → uses that revision
- If the adapter sends `Version:<something>` → legacy mode
- If **nothing** received within 1 second → `communicationRevision = "legacy"`, `version = "0.5.0"`

Our adapter sends nothing on connection, so the extension **always** enters legacy mode after 1 second.

### How Commands Flow (socket.ts → port.ts → content.ts)

1. Adapter sends text message on WebSocket
2. `socket.ts onMessage()` (line 99): If `communicationRevision` is set, calls `executeEvent(port, revision, data)`
3. `port.ts executeEvent()` (line 37): Routes by revision
   - `"legacy"` / `"1"`: Forwards raw `eventData` string to content script port
   - `"3"`: Parses `<playerId> <eventId> <data>` format
4. `content.ts` receives port message, dispatches to `OnEventLegacy()` / `OnEventRev1()` / `OnEventRev2()` / `OnEventRev3()`

### Legacy Mode Commands (content.ts:391-486) — **WHAT WE USE**

Parser: `const [type, data] = message.toUpperCase().split(" ");`

The adapter must send **text command names**, NOT numeric codes:

| Send This | Action | Notes |
|-----------|--------|-------|
| `PLAYPAUSE` | Toggle play/pause | Checks `canSetState` |
| `PREVIOUS` | Skip to previous track | Checks `canSkipPrevious` |
| `NEXT` | Skip to next track | Checks `canSkipNext` |
| `SETPOSITION 34:` | Seek to 34 seconds | Note trailing colon. Checks `canSetPosition` |
| `SETVOLUME 75` | Set volume to 75% | Checks `canSetVolume` |
| `REPEAT` | Cycle repeat mode (NONE→ALL→ONE) | Checks `canSetRepeat` |
| `SHUFFLE` | Toggle shuffle | Checks `canSetShuffle` |
| `TOGGLETHUMBSUP` | Toggle like (rating 5/0) | Checks `canSetRating` |
| `TOGGLETHUMBSDOWN` | Toggle dislike (rating 1/0) | Checks `canSetRating` |
| `RATING 4` | Set rating to 4 | Checks `canSetRating` |

### Rev 1 Commands (content.ts:488-581)

Same logic as legacy but with different names:

| Send This | Action |
|-----------|--------|
| `TOGGLE_PLAYING` | Toggle play/pause |
| `PREVIOUS` | Skip previous |
| `NEXT` | Skip next |
| `SET_POSITION 34:` | Seek (with colon) |
| `SET_VOLUME 75` | Set volume |
| `TOGGLE_REPEAT` | Cycle repeat |
| `TOGGLE_SHUFFLE` | Toggle shuffle |
| `TOGGLE_THUMBS_UP` | Toggle like |
| `TOGGLE_THUMBS_DOWN` | Toggle dislike |
| `SET_RATING 4` | Set rating |

### Rev 2 Commands (content.ts:583-665)

Uses `TRY_` prefix, toggle-based repeat/shuffle:

| Send This | Action |
|-----------|--------|
| `TRY_SET_STATE PLAYING` | Set state directly (PLAYING/PAUSED/STOPPED) |
| `TRY_SKIP_PREVIOUS` | Skip previous |
| `TRY_SKIP_NEXT` | Skip next |
| `TRY_SET_POSITION 34:` | Seek (with colon) |
| `TRY_SET_VOLUME 75` | Set volume |
| `TRY_TOGGLE_REPEAT_MODE` | Cycle repeat |
| `TRY_TOGGLE_SHUFFLE_ACTIVE` | Toggle shuffle |
| `TRY_SET_RATING 4` | Set rating |

### Rev 3 Commands (content.ts:667-733) — **CURRENT VERSION**

Format: `<playerId> <eventId> <eventType> [data]`

| EventType | Command | Data | Action |
|-----------|---------|------|--------|
| `0` | TRY_SET_STATE | `0`=PLAYING, `1`=PAUSED, `2`=STOPPED | Set state directly |
| `1` | TRY_SKIP_PREVIOUS | (none) | Previous track |
| `2` | TRY_SKIP_NEXT | (none) | Next track |
| `3` | TRY_SET_POSITION | seconds (integer) | Seek |
| `4` | TRY_SET_VOLUME | 0-100 (integer) | Set volume |
| `5` | TRY_SET_RATING | 0-5 (integer) | Set rating |
| `6` | TRY_SET_REPEAT | "NONE", "ALL", or "ONE" | Set repeat directly (not toggle!) |
| `7` | TRY_SET_SHUFFLE | `0` or `1` | Set shuffle directly (not toggle!) |

Examples:
```
0 1 0 0        → Player 0, event#1, set state PLAYING
0 2 2          → Player 0, event#2, skip next
0 3 3 120      → Player 0, event#3, seek to 120s
0 4 4 75       → Player 0, event#4, set volume 75
0 5 6 ALL      → Player 0, event#5, set repeat ALL
0 6 7 1        → Player 0, event#6, shuffle ON
```

### Rev 3 Event Results

After each command, extension sends back:
```
3 <eventId> <status>
```
Where `MessageType.EVENT_RESULT = 3`, status: `1` = SUCCEEDED, `2` = FAILED

### Rev 3 Metadata Format (Different from Legacy!)

Rev 3 sends **pipe-delimited** player data (NOT KEY:VALUE):
```
0 <playerId> id|name|title|artist|album|cover|state|position|duration|volume|rating|repeat|shuffle|ratingSystem|availableRepeat|canSetState|canSkipPrevious|canSkipNext|canSetPosition|canSetVolume|canSetRating|canSetRepeat|canSetShuffle|createdAt|updatedAt|activeAt|
```

Cover art is sent separately as binary (ArrayBuffer) with 4-byte player ID prefix.

### Key Implementation Notes

1. **Legacy mode has no play/pause distinction** — only `PLAYPAUSE` toggle. Rev 2+ has `TRY_SET_STATE PLAYING/PAUSED` for direct control.
2. **Legacy SETPOSITION requires trailing colon**: `"SETPOSITION 34:"` not `"SETPOSITION 34"`. The colon is a delimiter from the old protocol.
3. **Legacy REPEAT/SHUFFLE are toggle-only** — they cycle through modes. Rev 3 has direct `SET_REPEAT` with value.
4. **Rev 3 uses playerId** from PLAYER_ADDED messages. Legacy/Rev1/Rev2 always target the active player.
5. **Our adapter is currently in legacy mode** because we don't send a handshake. This is fine — legacy metadata (KEY:VALUE) is what we already parse.

### Source Files

- `src/extension/sw/socket.ts` — WebSocket handler, revision detection (onMessage:99, onOpen:80 with 1s timeout)
- `src/extension/sw/port.ts` — executeEvent routing (line 37), sendEventResult (line 12)
- `src/extension/content/content.ts` — OnEventLegacy (391), OnEventRev1 (488), OnEventRev2 (583), OnEventRev3 (667)
- `src/extension/types.ts` — StateMode, Repeat, Player type definitions

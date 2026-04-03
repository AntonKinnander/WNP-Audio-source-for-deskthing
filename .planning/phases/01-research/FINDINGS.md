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

# WNP Event Mapping Reference

**Live testing conducted with YouTube Music on 2025-04-03**

This document maps the actual WNP protocol messages to user actions and events.

---

## Protocol Format

The WNP browser extension sends **text-based KEY:VALUE messages**, not JSON.

```
KEY:VALUE
```

Each field is sent as a separate WebSocket message.

---

## Browser → Adapter Messages (Received)

### Core Metadata Fields

| Message | Value Example | Description |
|---------|---------------|-------------|
| `PLAYER:<name>` | `YouTube Music` | Player/source name |
| `TITLE:<text>` | `Song Name` | Track title |
| `ARTIST:<text>` | `Artist Name` | Artist name (may be empty) |
| `ALBUM:<text>` | `Album Name` | Album name (may be empty) |
| `COVER:<url>` | `https://i.ytimg.com/...` | Cover art URL |

### Playback State Fields

| Message | Value | User Action |
|---------|-------|-------------|
| `STATE:0` | Stopped | Stop / Close player / No track loaded |
| `STATE:1` | Playing | Play / Start playback |
| `STATE:2` | Paused | Pause |

### Timing Fields

| Message | Format | Description |
|---------|--------|-------------|
| `DURATION:M:SS` | `3:45` | Track duration |
| `POSITION:M:SS` | `1:23` | Current position (updates every ~1 second) |

**Special timing sequences:**
- `DURATION:0:00` + `POSITION:0:00` + `STATE:0` = Player stopped / closed
- New `DURATION` + `POSITION:0:00` = New track loaded

### Volume Field

| Message | Value Range | User Action |
|---------|-------------|-------------|
| `VOLUME:X` | 0-100 | Volume slider change |

**Observed values during testing:** 0, 21, 76, 100

### Playback Options Fields

| Message | Value | Mode |
|---------|-------|------|
| `REPEAT:0` | Off | Repeat disabled |
| `REPEAT:1` | All | Repeat all tracks |
| `REPEAT:2` | One | Repeat single track |
| `SHUFFLE:0` | Off | Shuffle disabled |
| `SHUFFLE:1` | On | Shuffle enabled |

### Rating Field

| Message | Value | Description |
|---------|-------|-------------|
| `RATING:X` | 0-5 | Track rating (0 = not rated) |

---

## Inferred Events (Not Explicit Messages)

### Skip Next / Skip Previous

The WNP protocol **does not send explicit skip messages**. Skip actions are **inferred** from state changes:

| Observation | Inferred Action |
|-------------|-----------------|
| New `TITLE` + `POSITION:0:00` + `STATE:1` | Skip to next/previous track |
| New `COVER` + new `DURATION` | Track changed |

**Why this works:**
- When user clicks "Next", browser loads new track
- New metadata arrives with position reset to 0:00
- Adapter detects this as a track change

### Track Changes

| Message Sequence | Event |
|------------------|-------|
| `TITLE` changes | New track |
| `ARTIST` changes | New track |
| `COVER` changes | New track (different artwork) |
| `DURATION` changes | New track (different length) |

---

## Adapter → Browser Commands (Sent)

These commands are **sent by our adapter TO the browser** to control playback:

### Playback Controls

| Command | Description |
|---------|-------------|
| `play` | Start playback |
| `pause` | Pause playback |
| `play-pause` | Toggle playback |
| `set-state` | Set specific state (playing/paused/stopped) |

### Navigation

| Command | Description |
|---------|-------------|
| `skip-next` | Skip to next track |
| `skip-previous` | Skip to previous track |

### Position/Seeking

| Command | Description |
|---------|-------------|
| `set-position` | Seek to position (seconds) |
| `forward` | Seek forward by seconds |
| `revert` | Seek backward by seconds |

### Volume

| Command | Description |
|---------|-------------|
| `set-volume` | Set volume (0-100) |

### Playback Options

| Command | Description |
|---------|-------------|
| `set-repeat` | Set repeat mode (NONE/ALL/ONE) |
| `toggle-repeat` | Cycle through repeat modes |
| `set-shuffle` | Set shuffle (true/false) |

### Rating

| Command | Description |
|---------|-------------|
| `set-rating` | Set rating value |

---

## Message Flow Examples

### Example 1: Playing a Song

```
RECIPIENT
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

### Example 2: Pausing

```
STATE:2
```

### Example 3: Skipping to Next Track

```
TITLE:Dj Ramezz "Looking For Life" 2024 (Synthwave Version)
COVER:https://i.ytimg.com/vi/iPt1YcME4-w/sddefault.jpg
STATE:1
DURATION:3:19
POSITION:0:00
```

### Example 4: Changing Volume

```
VOLUME:76
```

### Example 5: Position Updates (during playback)

```
POSITION:0:01
POSITION:0:02
POSITION:0:03
...
```

---

## Value Mapping Reference

### STATE Values

| Value | Enum | Description |
|-------|------|-------------|
| 0 | Stopped | No media playing |
| 1 | Playing | Active playback |
| 2 | Paused | Playback paused |

### REPEAT Values

| Value | Mode | Description |
|-------|------|-------------|
| 0 | None | No repeat |
| 1 | All | Repeat all/playlist |
| 2 | One | Repeat single track |

### SHUFFLE Values

| Value | State | Description |
|-------|-------|-------------|
| 0 | Off | Shuffle disabled |
| 1 | On | Shuffle enabled |

---

## Implementation Notes

1. **Accumulate fields**: Since each field arrives as a separate message, accumulate them into a state object.

2. **Detect track changes**: A new track is indicated by a change in `TITLE` (or `ARTIST`, `COVER`, `DURATION`) combined with `POSITION:0:00`.

3. **Position updates**: During playback, only `POSITION` updates are sent (approximately every second).

4. **Empty values**: Some fields may be empty (e.g., `ALBUM:` with no value after colon).

5. **Commands are one-way**: Skip/previous commands are sent TO the browser; results come back as new metadata, not as confirmation messages.

---

**Test Date:** 2025-04-03
**Test Platform:** YouTube Music on Chrome
**WNP Extension Version:** Unknown (latest from Chrome Web Store)

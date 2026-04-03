# WNP to Deskthing Data Mapping

This document maps WebNowPlaying (WNP) protocol data and controls to Deskthing's SongData11 format and AUDIO_REQUESTS.

## Overview

**Data Flow:**
```
Browser Extension → WNP Protocol (localhost:6344) → Our Adapter → Deskthing SDK → Deskthing UI
```

**WNP Role:** Receives metadata from browser and accepts commands from our adapter.
**Our Adapter Role:** Translates WNP data to Deskthing SongData11, forwards Deskthing commands to WNP.

---

## 1. Song Data Fields: WNP → Deskthing (SongData11)

### Core Track Information

| WNP Field | Deskthing Field (SongData11) | Type | Notes |
|-----------|------------------------------|------|-------|
| `title` | `track_name` | string | Direct mapping |
| `artist` | `artist` | string | WNP may return array; take first or join |
| `album` | `album` | string \| null | Direct mapping |
| `cover_url` / `Cover` | `thumbnail` | string \| null | **YES! Album covers are available** as URL |
| `id` / `_ID` | `id` | string \| null | Player-specific track ID |
| `player_name` / `Player` | `source` | string | Use as source identifier (e.g., "YouTube", "Spotify") |

### Duration and Position

| WNP Field | Deskthing Field | Conversion Required |
|-----------|-----------------|---------------------|
| `duration` | `track_duration` | Convert `(HH):MM:SS` to milliseconds |
| `duration_sec` / `DurationSeconds` | `track_duration` | Multiply by 1000 for milliseconds |
| `position` / `Position` | `track_progress` | Convert `(HH):MM:SS` to milliseconds |
| `position_sec` / `PositionSeconds` | `track_progress` | Multiply by 1000 for milliseconds |
| `position_percent` / `Progress` | - | Not used directly in SongData11 (0-100) |

### Playback State

| WNP Field | Deskthing Field | Mapping |
|-----------|-----------------|---------|
| `state` / `State` | `is_playing` | 0=stopped→false, 1=playing→true, 2=paused→false |
| `state` = "playing"/"paused"/"stopped" | `is_playing` | String: "playing"→true, else→false |

### Shuffle and Repeat

| WNP Field | Deskthing Field | Mapping |
|-----------|-----------------|---------|
| `shuffle` / `ShuffleActive` | `shuffle_state` | 0→false, 1→true |
| `repeat` / `RepeatMode` | `repeat_state` | 0→"off", 1→"track", 2→"all" |

### Volume

| WNP Field | Deskthing Field | Notes |
|-----------|-----------------|-------|
| `volume` / `Volume` | `volume` | 0-100 range (both use same) |

### Device Information

| WNP Field | Deskthing Field | Notes |
|-----------|-----------------|-------|
| `name` | `device` | Player/display name |
| `id` / `_ID` | `device_id` | Unique player identifier |

### Not Directly Mapped (Available from WNP, not in SongData11)

| WNP Field | Type | Description |
|-----------|------|-------------|
| `rating` | int (0-5) | Track rating |
| `rating_system` | int | 0=None, 1=Like, 2=Like-Dislike, 3=Scale |
| `remaining` | string | Remaining time in `(HH):MM:SS` |
| `is_web_browser` | bool | Whether source is web browser |
| `platform` | int | 0=none, 1=web, 2=linux, 3=darwin, 4=windows |
| `created_at`, `updated_at`, `active_at` | timestamp | Player metadata timestamps |

### SongData11 Fields Not Available from WNP

| Deskthing Field | Availability | Alternative |
|-----------------|--------------|-------------|
| `playlist` | ❌ Not available | Could derive from context if needed |
| `playlist_id` | ❌ Not available | N/A |
| `liked` | ⚠️ Partial | Use `rating` if `rating_system` is "Like" |
| `color` | ❌ Not available | Could extract from thumbnail |
| `can_*` fields | ✅ Available | See Capability Flags below |

---

## 2. Capability Flags (Abilities Mapping)

Deskthing uses an `abilities` array (SongAbilities enum). WNP provides boolean flags.

### Mapping: WNP Capability Flags → SongAbilities

| WNP Flag | SongAbilities | WNP CLI Variable |
|----------|---------------|------------------|
| `can_set_state` / `SupportsPlayPause` | PLAY, PAUSE | `{{can-set-state}}` |
| `can_skip_next` / `SupportsSkipNext` | NEXT | `{{can-skip-next}}` |
| `can_skip_previous` / `SupportsSkipPrevious` | PREVIOUS | `{{can-skip-previous}}` |
| `can_set_position` / `SupportsSetPosition` | REWIND, FAST_FORWARD | `{{can-set-position}}` |
| `can_set_volume` / `SupportsSetVolume` | CHANGE_VOLUME | `{{can-set-volume}}` |
| `can_set_shuffle` / `SupportsToggleShuffleActive` | SHUFFLE | `{{can-set-shuffle}}` |
| `can_set_repeat` / `SupportsToggleRepeatMode` | REPEAT | `{{can-set-repeat}`` |
| `can_set_rating` / `SupportsSetRating` | LIKE | `{{can-set-rating}}` |
| `can_set_output` | SET_OUTPUT | Not in WNP (local OS only) |

### Generating Abilities Array

```typescript
function getWnpAbilities(wnpData): SongAbilities[] {
  const abilities: SongAbilities[] = [];
  if (wnpData.can_set_state) abilities.push(SongAbilities.PLAY, SongAbilities.PAUSE);
  if (wnpData.can_skip_next) abilities.push(SongAbilities.NEXT);
  if (wnpData.can_skip_previous) abilities.push(SongAbilities.PREVIOUS);
  if (wnpData.can_set_position) abilities.push(SongAbilities.REWIND, SongAbilities.FAST_FORWARD);
  if (wnpData.can_set_volume) abilities.push(SongAbilities.CHANGE_VOLUME);
  if (wnpData.can_set_shuffle) abilities.push(SongAbilities.SHUFFLE);
  if (wnpData.can_set_repeat) abilities.push(SongAbilities.REPEAT);
  if (wnpData.can_set_rating) abilities.push(SongAbilities.LIKE);
  return abilities;
}
```

---

## 3. Control/Interaction Mapping

### Playback Controls

| Deskthing AUDIO_REQUESTS | Deskthing Payload | WNP Command | WNP Parameters |
|--------------------------|-------------------|-------------|----------------|
| `PLAY` | `undefined` or `{id, position, playlist}` | `play` / `try_set_state("PLAYING")` | Optional: track ID, position in ms |
| `PAUSE` | `undefined` | `pause` / `try_set_state("PAUSED")` | None |
| `STOP` | `undefined` | ❌ Not available in WNP | N/A |
| `NEXT` | `undefined` | `skip-next` / `try_skip_next` | None |
| `PREVIOUS` | `undefined` | `skip-previous` / `try_skip_previous` | None |

### Seek Controls

| Deskthing AUDIO_REQUESTS | Deskthing Payload | WNP Command | WNP Parameters |
|--------------------------|-------------------|-------------|----------------|
| `SEEK` | `number` (milliseconds) | `set-position [x]` | Convert ms to seconds |
| `REWIND` | `number` (amount to rewind) | `set-position -x` | Convert ms to seconds, negative |
| `FAST_FORWARD` | `number` (amount to forward) | `set-position +x` | Convert ms to seconds, positive |

### Volume Controls

| Deskthing AUDIO_REQUESTS | Deskthing Payload | WNP Command | WNP Parameters |
|--------------------------|-------------------|-------------|----------------|
| `VOLUME` | `number` (0-100) | `set-volume [x]` | Direct (0-100) |
| | | `set-volume +x` | Increase by x |
| | | `set-volume -x` | Decrease by x |

### Mode Controls

| Deskthing AUDIO_REQUESTS | Deskthing Payload | WNP Command | WNP Parameters |
|--------------------------|-------------------|-------------|----------------|
| `SHUFFLE` | `boolean` | `set-shuffle 0/1` / `try_set_shuffle` | 0=off, 1=on |
| `REPEAT` | `"off"\|"track"\|"all"` | `set-repeat NONE/ONE/ALL` | Map: off→NONE, track→ONE, all→ALL |
| | | `toggle-repeat` / `try_toggle_repeat` | Cycles through modes |

### Like/Rating Controls

| Deskthing AUDIO_REQUESTS | Deskthing Payload | WNP Command | WNP Parameters |
|--------------------------|-------------------|-------------|----------------|
| `LIKE` | `string\|boolean` | `set-rating [0-5]` | Map boolean to 0 or 5 |
| | | `toggle-thumbs-up` | Sets rating to 5 or 0 |
| | | `toggle-thumbs-down` | Sets rating to 1 or 0 |

---

## 4. Album Cover Art Details

**YES, album covers are available!** WNP provides cover art through:

1. **`cover_url`** - Direct URL to the cover art image
2. **`Cover` (Rainmeter)** - Local file path where cover is downloaded and cached
3. **`CoverWebAddress` (Rainmeter)** - Raw URL without download

### Cover Handling Options

**Option 1: Direct URL (Recommended)**
- Pass `cover_url` directly to `thumbnail` field
- Deskthing UI will handle loading and caching

**Option 2: Download and Cache (Like Local Audio App)**
- Download image from `cover_url`
- Generate hash using `getAudioHash(id or title+artist)`
- Save to local cache directory
- Pass local path to `thumbnail` field

**Reference Implementation:**
```typescript
// From audio app mediaStore.ts
if (message.thumbnail) {
  const safeName = getAudioHash(message.id || `${message.trackName}-${message.artist}`)
  message.thumbnail = await saveImage(message.thumbnail, safeName)
}
```

---

## 5. Conversion Helper Functions

### Time Format Conversion

```typescript
// Convert (HH):MM:SS to milliseconds
function timeToMillis(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    return (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
  } else if (parts.length === 2) {
    return (parts[0] * 60 + parts[1]) * 1000;
  }
  return 0;
}

// Convert milliseconds to (HH):MM:SS
function millisToTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
```

### State Conversion

```typescript
// WNP state to Deskthing is_playing
function wnpStateToIsPlaying(state: number | string): boolean {
  if (typeof state === 'number') {
    return state === 1; // 0=stopped, 1=playing, 2=paused
  }
  return state.toLowerCase() === 'playing';
}

// Deskthing repeat to WNP repeat
function deskthingRepeatToWnp(repeat: "off" | "track" | "all"): string {
  const mapping = { off: "NONE", track: "ONE", all: "ALL" };
  return mapping[repeat];
}
```

---

## 6. Full SongData11 Construction Example

```typescript
function wnpToSongData11(wnpData: any): SongData11 {
  return {
    version: 2,
    track_name: wnpData.title || 'Unknown Track',
    artist: wnpData.artist || null,
    album: wnpData.album || null,
    thumbnail: wnpData.cover_url || null,
    is_playing: wnpStateToIsPlaying(wnpData.state),
    track_duration: wnpData.duration_sec ? wnpData.duration_sec * 1000 : null,
    track_progress: wnpData.position_sec ? wnpData.position_sec * 1000 : null,
    volume: wnpData.volume ?? 0,
    shuffle_state: wnpData.shuffle === 1,
    repeat_state: wnpRepeatToDeskthing(wnpData.repeat),
    source: wnpData.player_name || 'Web Player',
    device: wnpData.name || null,
    device_id: wnpData.id || null,
    id: wnpData.id || null,
    playlist: null,  // Not available from WNP
    playlist_id: null,  // Not available from WNP
    abilities: getWnpAbilities(wnpData)
  };
}
```

---

## 7. WNP Protocol Events (for reference)

The WNP adapter library emits these events (useful for debugging):

| Event | Description |
|-------|-------------|
| `on_player_added` | New player detected |
| `on_player_updated` | Player metadata changed |
| `on_player_removed` | Player disconnected |
| `on_active_player_changed` | Active player switched |

---

## 8. Important Notes

### Desktop Players vs Web Players
- Web players (YouTube, Spotify Web) have full WNP support
- Desktop players (Spotify.exe, etc.) have **limited support** on Windows:
  - Volume control: ❌ NOT supported
  - Rating control: ❌ NOT supported
  - Other controls: ⚠️ Depends on player

### Port Configuration
- Default WNP port: 6534
- **Our assigned port: 6344**
- The browser extension connects to OUR adapter on this port

### WNP Library Options
1. **pywnp** (Python) - Used by OBS, well-maintained
2. **wnp-c** (C library) - Used by CLI
3. **Custom implementation** - WebSocket server on port 6344

### Data Limitations
- `playlist` and `playlist_id` are not available from WNP
- `liked` status must be derived from `rating` field
- Some fields are browser/website dependent

---

## Summary

| What We Get | Mapping Complexity |
|-------------|-------------------|
| Title, Artist, Album | ✅ Direct |
| Cover Art | ✅ Available via URL |
| Duration, Position | ⚠️ Format conversion (seconds/ms) |
| Play/Pause/Skip | ✅ Direct |
| Seek (position) | ⚠️ Unit conversion (ms→seconds) |
| Volume | ✅ Direct (0-100) |
| Shuffle, Repeat | ✅ Direct |
| Rating/Like | ✅ Available (0-5 scale) |
| Playlist info | ❌ Not available |

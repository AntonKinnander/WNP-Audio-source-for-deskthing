# WNP to Deskthing Data Mapping

This document provides a comprehensive reference for mapping WebNowPlaying (WNP) protocol data to Deskthing's SongData11 format, including data type conversions, state mappings, and edge case handling.

**Purpose:** Reference document for implementing WNP → SongData11 data translation.

**Status:** Phase 01 Research, Task 01-02

**⚠️ CRITICAL UPDATE (2025-04-03):** The WNP browser extension sends **text-based KEY:VALUE messages**, NOT JSON. See `WNP-Protocol-Findings.md` section 15 for the actual protocol format discovered through live testing with YouTube Music.

---

## 1. Core Metadata Fields Mapping

### Track Identification

| WNP Field | WNP Type | SongData11 Field | SongData11 Type | Notes |
|-----------|----------|------------------|-----------------|-------|
| `title` / `Title` | string | `track_name` | string | Direct mapping. Default: "Unknown Track" |
| `artist` / `Artist` | string or string[] | `artist` | string \| null | If array: use first element or join with ", ". Default: null |
| `album` / `Album` | string | `album` | string \| null | Direct mapping. Default: null |
| `id` / `ID` / `_ID` | string or number | `id` | string \| null | Player-specific track ID. Convert to string. Default: null |
| `player_name` / `Player` | string | `source` | string | Identifies the source (e.g., "YouTube", "Spotify Web"). Default: "Web Player" |
| `name` | string | `device` | string \| null | Player/display name. Default: null |
| `id` (player) | string or number | `device_id` | string \| null | Unique player identifier. Default: null |

### Album Art

| WNP Field | WNP Type | SongData11 Field | SongData11 Type | Notes |
|-----------|----------|------------------|-----------------|-------|
| `cover_url` | string | `thumbnail` | string \| null | Direct URL. Can be passed to Deskthing UI or downloaded and cached locally |
| `Cover` | string | `thumbnail` | string \| null | Local file path (Rainmeter format). Already downloaded |
| `CoverWebAddress` | string | `thumbnail` | string \| null | Raw URL without download |

---

## 2. Timing Fields Mapping

### Duration and Position

| WNP Field | WNP Type | SongData11 Field | Conversion | Example |
|-----------|----------|------------------|------------|---------|
| `duration_seconds` / `DurationSeconds` | number (seconds) | `track_duration` | Multiply by 1000 → milliseconds | `180` → `180000` |
| `duration` | string "M:SS" or "H:M:SS" | `track_duration` | Parse and convert to milliseconds | `"3:20"` → `200000` |
| `position_seconds` / `PositionSeconds` | number (seconds) | `track_progress` | Multiply by 1000 → milliseconds | `45` → `45000` |
| `position` / `Position` | string "M:SS" or "H:M:SS" | `track_progress` | Parse and convert to milliseconds | `"1:15"` → `75000` |
| `position_percent` / `Progress` | number (0-100) | *(not used)* | Not directly mapped to SongData11 | N/A |

### Time Conversion Requirements

**Input: WNP "M:SS" or "H:M:SS" format**
- Format: `[HH:]MM:SS` where hours are optional
- Separator: Colon (`:`)

**Output: SongData11 milliseconds**

**Conversion Examples:**
```
"0:45"    → 45000    (45 seconds)
"3:20"    → 200000   (3 minutes, 20 seconds)
"1:05:30" → 3930000  (1 hour, 5 minutes, 30 seconds)
```

**Edge Cases:**
- Empty string → `null`
- `"0:00"` → `0`
- Malformed format → Attempt parsing, fallback to `null`
- Values > 24 hours → Handle as overflow (unlikely for music)

---

## 3. Playback State Mapping

### State Enum to Boolean

| WNP Value (String) | WNP Value (Number) | SongData11 `is_playing` | Notes |
|--------------------|--------------------|-------------------------|-------|
| `"playing"` / `"PLAYING"` | `1` | `true` | Active playback |
| `"paused"` / `"PAUSED"` | `2` | `false` | Playback paused |
| `"stopped"` / `"STOPPED"` | `0` | `false` | No media active |
| *(any other)* | *(any other)* | `false` | Default fallback |

### State Conversion Logic

**Input Type Detection:**
- If `typeof state === 'number'`: Compare to numeric enum values
- If `typeof state === 'string'`: Case-insensitive comparison to "playing"
- Otherwise: Default to `false`

**Edge Cases:**
- `null`/`undefined` → `false`
- Empty string → `false`
- Invalid number → `false`
- Mixed case ("Playing", "PLAYING") → Handle case-insensitively

---

## 4. Shuffle and Repeat State Mapping

### Shuffle State

| WNP Field | WNP Type | SongData11 Field | Conversion |
|-----------|----------|------------------|------------|
| `shuffle_active` / `ShuffleActive` | boolean | `shuffle_state` | Direct mapping (boolean) |
| `shuffle` / `Shuffle` | number (0 or 1) | `shuffle_state` | 0 → `false`, 1 → `true` |

**Edge Cases:**
- `null`/`undefined` → `null` (SongData11 allows null)
- Invalid number → Treat falsy values as `false`

### Repeat State Mapping

| WNP Value | WNP Type | SongData11 `repeat_state` | Notes |
|-----------|----------|---------------------------|-------|
| `"NONE"` / `0` | string or number | `"off"` | No repeat |
| `"ALL"` / `2` | string or number | `"all"` | Repeat all/playlist |
| `"ONE"` / `1` | string or number | `"track"` | Repeat single track |

**Conversion Table:**

| WNP Input | Type | SongData11 Output |
|-----------|------|-------------------|
| `"none"`, `"NONE"` | string | `"off"` |
| `"all"`, `"ALL"` | string | `"all"` |
| `"one"`, `"ONE"` | string | `"track"` |
| `0` | number | `"off"` |
| `1` | number | `"track"` |
| `2` | number | `"all"` |
| *(other/invalid)* | any | `"off"` (default) |

**Edge Cases:**
- `null`/`undefined` → `"off"`
- Case variations → Handle case-insensitively
- Invalid number → Default to `"off"`

---

## 5. Volume Mapping

| WNP Field | WNP Type | SongData11 Field | Notes |
|-----------|----------|------------------|-------|
| `volume` / `Volume` | number (0-100) | `volume` | Direct mapping (same range) |

**Volume Range:**
- Both WNP and SongData11 use 0-100 range
- No conversion required

**Edge Cases:**
- `null`/`undefined` → Use `0` or preserve last known value
- Out of range (< 0 or > 100) → Clamp to valid range
- Desktop players on Windows: Volume control NOT supported

---

## 6. Capability Flags (Abilities) Mapping

### WNP Capability Flags to SongAbilities Array

| WNP Field (v3.x) | WNP Field (CLI) | SongAbilities Enum | Notes |
|------------------|-----------------|-------------------|-------|
| `can_set_state` | `SupportsPlayPause` | `PLAY`, `PAUSE` | Maps to both abilities |
| `can_skip_next` | `SupportsSkipNext` | `NEXT` | Direct |
| `can_skip_previous` | `SupportsSkipPrevious` | `PREVIOUS` | Direct |
| `can_set_position` | `SupportsSetPosition` | `REWIND`, `FAST_FORWARD` | Maps to both abilities |
| `can_set_volume` | `SupportsSetVolume` | `CHANGE_VOLUME` | Direct |
| `can_set_shuffle` | `SupportsToggleShuffleActive` | `SHUFFLE` | Direct |
| `can_set_repeat` | `SupportsToggleRepeatMode` | `REPEAT` | Direct |
| `can_set_rating` | `SupportsSetRating` | `LIKE` | Direct |

### Capability Flag Detection

**Version Differences:**
- v3.x: Boolean fields (`can_set_state`, etc.)
- CLI/legacy: Integer or boolean fields with different names

**Mapping Logic:**
- For each WNP capability flag, if `true`, add corresponding SongAbilities to array
- `can_set_position` maps to BOTH `REWIND` and `FAST_FORWARD`
- `can_set_state` maps to BOTH `PLAY` and `PAUSE`
- Missing fields default to `false` (capability not available)

**Desktop Player Limitations (Windows MTC):**
- `can_set_volume`: Always `false` for desktop players
- `can_set_rating`: Always `false` for desktop players
- Other capabilities: Player-dependent

---

## 7. Fields Not Mapped (WNP → SongData11)

### WNP Fields Without SongData11 Equivalent

| WNP Field | WNP Type | Description | Handling |
|-----------|----------|-------------|----------|
| `rating` | number (0-5) | Track rating | Not in SongData11; can derive for `liked` if needed |
| `rating_system` | number | Rating system type | Not in SongData11; metadata only |
| `remaining` | string "M:SS" | Remaining time | Can be calculated from duration - position |
| `is_web_browser` | boolean | Source is web browser | Metadata only; not in SongData11 |
| `platform` | number enum | Platform type | Metadata only; not in SongData11 |
| `created_at` | timestamp | Player creation time | Metadata only |
| `updated_at` | timestamp | Player last update | Metadata only |
| `active_at` | timestamp | Player last active | Metadata only |

### SongData11 Fields Not Available from WNP

| SongData11 Field | Availability | Alternative |
|------------------|--------------|-------------|
| `playlist` | Not available | Set to `null` |
| `playlist_id` | Not available | Set to `null` |
| `liked` | Partial | Derive from `rating` when `rating_system` is "like" |
| `color` | Not available | Could extract from thumbnail (advanced) |

---

## 8. Null and Undefined Handling Strategy

### Default Values for Missing Fields

| SongData11 Field | Default Value | Rationale |
|------------------|---------------|-----------|
| `track_name` | `"Unknown Track"` | User-friendly placeholder |
| `artist` | `null` | Indicates no artist data |
| `album` | `null` | Indicates no album data |
| `thumbnail` | `null` | Indicates no cover art |
| `track_duration` | `null` | Indicates unknown duration |
| `track_progress` | `null` | Indicates unknown position |
| `is_playing` | `false` | Safe default (not playing) |
| `shuffle_state` | `null` | Indicates unknown state |
| `repeat_state` | `"off"` | Safe default (no repeat) |
| `volume` | `50` | Mid-range default |
| `device` | `null` | Indicates no device info |
| `device_id` | `null` | Indicates no device ID |
| `id` | `null` | Indicates no track ID |
| `source` | `"Web Player"` | Generic source identifier |
| `playlist` | `null` | Not available from WNP |
| `playlist_id` | `null` | Not available from WNP |
| `abilities` | `[]` (empty array) | No capabilities when unknown |

### Null Handling Examples

**Scenario 1: New connection, no data yet**
```json
// WNP input (empty/default)
{}

// SongData11 output
{
  "track_name": "Unknown Track",
  "artist": null,
  "album": null,
  "is_playing": false,
  "track_duration": null,
  "track_progress": null,
  // ... other null defaults
}
```

**Scenario 2: Partial data (common during initial connection)**
```json
// WNP input
{
  "title": "Example Song",
  "state": "playing"
}

// SongData11 output
{
  "track_name": "Example Song",
  "artist": null,
  "album": null,
  "is_playing": true,
  "track_duration": null,
  "track_progress": null,
  // ... other null defaults
}
```

---

## 9. Array Handling Requirements

### Artist Field

**WNP Input Variations:**
- Single string: `"Artist Name"`
- Array of strings: `["Artist 1", "Artist 2"]`
- Empty/null: `null` or `[]`

**Conversion to SongData11:**
- **Single string:** Direct mapping
- **Array:** Use first element OR join with comma separator
  - First element: `artist[0]`
  - Joined: `artist.join(", ")`
- **Empty/null:** `null`

**Examples:**
```javascript
// Single artist
"Taylor Swift" → "Taylor Swift"

// Multiple artists (first element)
["The Beatles", "John Lennon"] → "The Beatles"

// Multiple artists (joined)
["The Beatles", "John Lennon"] → "The Beatles, John Lennon"

// Empty
null → null
[] → null
```

**Recommendation:** Join with comma separator for completeness, or provide config option.

---

## 10. URL Handling for Album Art

### Cover URL Processing Options

**Option 1: Direct URL (Recommended for initial implementation)**
- Pass `cover_url` directly to `thumbnail` field
- Pros: Simple, no processing
- Cons: UI handles all loading/caching

**Option 2: Download and Cache (Like local audio app)**
- Download image from URL
- Generate deterministic hash from track ID or title+artist
- Save to local cache directory
- Pass local path to `thumbnail`

**Download Cache Pattern (Reference):**
```javascript
// Hash generation (from audio app)
function getAudioHash(songId: string): string {
  return crypto.createHash("sha256")
    .update(songId)
    .digest("hex")
    .slice(0, 16);
}

// Usage
if (wnpData.cover_url) {
  const safeName = getAudioHash(wnpData.id || `${wnpData.title}-${wnpData.artist}`);
  thumbnail = await saveImage(wnpData.cover_url, safeName);
}
```

**URL Handling Edge Cases:**
- Invalid URL → Set `thumbnail` to `null`
- HTTP (non-HTTPS) → Allow but log warning
- Data URLs (`data:image/...`) → Pass through or reject based on size
- Relative URLs → Resolve against base URL (not typical for WNP)

---

## 11. Complete Field Mapping Reference Table

### All WNP Fields to SongData11

| WNP Field | WNP Alt Names | SongData11 Field | Type Conversion | Default |
|-----------|---------------|------------------|-----------------|---------|
| **Core Metadata** |
| `title` | `Title` | `track_name` | string → string | "Unknown Track" |
| `artist` | `Artist` | `artist` | string[] → string (join) | null |
| `album` | `Album` | `album` | string → string \| null | null |
| `id` | `ID`, `_ID` | `id` | any → string \| null | null |
| `player_name` | `Player` | `source` | string → string | "Web Player" |
| `name` | - | `device` | string → string \| null | null |
| **Album Art** |
| `cover_url` | `Cover`, `CoverWebAddress` | `thumbnail` | string → string \| null | null |
| **Timing** |
| `duration_seconds` | `DurationSeconds` | `track_duration` | number × 1000 → number \| null | null |
| `duration` | - | `track_duration` | "M:SS" → ms → number \| null | null |
| `position_seconds` | `PositionSeconds` | `track_progress` | number × 1000 → number \| null | null |
| `position` | `Position` | `track_progress` | "M:SS" → ms → number \| null | null |
| **State** |
| `state` | `State` | `is_playing` | "playing" → boolean | false |
| `shuffle_active` | `ShuffleActive` | `shuffle_state` | boolean → boolean \| null | null |
| `shuffle` | `Shuffle` | `shuffle_state` | 0/1 → boolean \| null | null |
| `repeat_mode` | `RepeatMode` | `repeat_state` | enum → enum | "off" |
| `repeat` | `Repeat` | `repeat_state` | 0/1/2 → enum | "off" |
| **Volume** |
| `volume` | `Volume` | `volume` | 0-100 → 0-100 | 50 |
| **Capabilities** |
| `can_set_state` | `SupportsPlayPause` | `abilities[]` | boolean → [PLAY, PAUSE] | [] |
| `can_skip_next` | `SupportsSkipNext` | `abilities[]` | boolean → [NEXT] | [] |
| `can_skip_previous` | `SupportsSkipPrevious` | `abilities[]` | boolean → [PREVIOUS] | [] |
| `can_set_position` | `SupportsSetPosition` | `abilities[]` | boolean → [REWIND, FAST_FORWARD] | [] |
| `can_set_volume` | `SupportsSetVolume` | `abilities[]` | boolean → [CHANGE_VOLUME] | [] |
| `can_set_shuffle` | `SupportsToggleShuffleActive` | `abilities[]` | boolean → [SHUFFLE] | [] |
| `can_set_repeat` | `SupportsToggleRepeatMode` | `abilities[]` | boolean → [REPEAT] | [] |
| `can_set_rating` | `SupportsSetRating` | `abilities[]` | boolean → [LIKE] | [] |

---

## 12. Edge Case Examples

### Edge Case 1: State String Case Variations

**Input:** Various case formats for "playing"
```
"playing"  → is_playing: true
"PLAYING"  → is_playing: true
"Playing"  → is_playing: true
"plaYING"  → is_playing: true
```

**Handling:** Case-insensitive comparison

---

### Edge Case 2: Malformed Time Strings

**Input:** Non-standard time formats
```
"45"         → Attempt parse as seconds only → 45000
"1:5"        → Single digit seconds → 65000
"1:5:30"     → Three parts → 3930000
"invalid"    → Parse failure → null
undefined    → null
```

**Handling:** Graceful degradation with fallback to null

---

### Edge Case 3: Missing Capability Flags (v2.x)

**Input:** v2.x WNP without capability fields
```json
{
  "title": "Song",
  "state": "playing"
  // No can_* fields
}
```

**Output:** Empty abilities array
```json
{
  "abilities": []
}
```

**Handling:** Assume no capabilities when flags are missing

---

### Edge Case 4: Empty Artist Array

**Input:** Empty artist data
```
null          → artist: null
[]            → artist: null
[""]          → artist: null
["", ""]      → artist: null
["Artist"]    → artist: "Artist"
["A", "B"]    → artist: "A, B"
```

**Handling:** Filter empty strings, return null if no valid artists

---

### Edge Case 5: Position Greater Than Duration

**Input:** Invalid timing data
```json
{
  "duration_seconds": 180,
  "position_seconds": 200
}
```

**Handling:**
- Log warning
- Still map values directly (UI will handle display)
- Alternatively, clamp position to duration

---

### Edge Case 6: Zero Duration with Playing State

**Input:** Inconsistent state
```json
{
  "state": "playing",
  "duration_seconds": 0
}
```

**Handling:**
- Stream/live content may have 0 duration
- Set `is_playing: true` (trust the state)
- Set `track_duration: null` (0 is ambiguous)

---

### Edge Case 7: Very Large Timestamp Values

**Input:** Nanoseconds instead of seconds
```
duration_seconds: 180000000  (50 hours in nanoseconds)
```

**Handling (from local audio app):**
- Check if value > 18000000 (8 hours in ms)
- If true, assume nanoseconds, divide by 10000
- Otherwise, assume seconds or milliseconds

---

## 13. Version-Specific Considerations

### WNP v1.x (Legacy)
- Capitalized field names (`State`, `Title`, etc.)
- May lack capability flags
- May have fewer fields

**Handling:** Normalize to lowercase, use defaults for missing fields

### WNP v2.x
- Lowercase snake_case field names
- Basic capability flags
- Desktop player support introduced

**Handling:** Standard case mapping, capability detection

### WNP v3.x (Current)
- Extended capability flags
- Multiple player support
- Event results for commands

**Handling:** Full capability mapping, multi-player considerations

---

## Summary

| Category | Complexity | Notes |
|----------|------------|-------|
| Core metadata (title, artist, album) | Low | Direct mapping, array handling for artist |
| Album art | Low | Direct URL or cache download |
| Duration/position | Medium | Seconds → milliseconds, time string parsing |
| State (is_playing) | Low | String/number to boolean |
| Shuffle/repeat | Medium | Enum mapping, case handling |
| Volume | Low | Same range (0-100) |
| Capabilities | Medium | Boolean flags to enum array |
| Null handling | Low | Defined defaults for all fields |

**Implementation Priority:**
1. Core metadata + state (is_playing)
2. Duration/position with conversion
3. Shuffle/repeat mapping
4. Capability flags
5. Null handling and edge cases

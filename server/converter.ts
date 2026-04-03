/**
 * WNP to Deskthing SongData11 Converter
 *
 * Transforms WebNowPlaying protocol data into Deskthing's SongData11 format.
 * Handles time conversions, state mappings, capability flags, and null handling.
 *
 * Based on: Documentation/WNP-to-Deskthing-Mapping.md
 */

import { SongAbilities, SongData11 } from "@deskthing/types";
import type { WNPPlayer, WNPState, WNPRepeatMode } from "./types";

/**
 * Default values for SongData11 fields when WNP data is missing
 */
const DEFAULTS = {
  track_name: "Unknown Track",
  source: "Web Player",
  repeat_state: "off" as const,
  volume: 50,
} as const;

/**
 * Converts WNP time string (M:SS or H:M:SS) to milliseconds
 * @param timeString - Time in "M:SS" or "H:M:SS" format
 * @returns Milliseconds or null if invalid
 */
export function timeStringToMillis(timeString: string | undefined | null): number | null {
  if (!timeString || typeof timeString !== "string") {
    return null;
  }

  const trimmed = timeString.trim();
  if (trimmed === "" || trimmed === "0:00") {
    return trimmed === "0:00" ? 0 : null;
  }

  // Split by colon
  const parts = trimmed.split(":");
  const numParts = parts.length;

  // Invalid format
  if (numParts < 2 || numParts > 3) {
    return null;
  }

  try {
    const seconds = parseInt(parts[numParts - 1], 10);
    const minutes = parseInt(parts[numParts - 2], 10);
    const hours = numParts === 3 ? parseInt(parts[0], 10) : 0;

    if (isNaN(seconds) || isNaN(minutes) || isNaN(hours)) {
      return null;
    }

    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  } catch {
    return null;
  }
}

/**
 * Converts seconds to milliseconds
 * @param seconds - Time in seconds
 * @returns Milliseconds or null if invalid
 */
export function secondsToMillis(seconds: number | undefined | null): number | null {
  if (seconds === undefined || seconds === null || isNaN(seconds)) {
    return null;
  }

  // Handle negative values
  if (seconds < 0) {
    return null;
  }

  return Math.round(seconds * 1000);
}

/**
 * Converts WNP state to is_playing boolean
 * @param state - WNP state string or number
 * @returns true if playing, false otherwise
 */
export function wnpStateToIsPlaying(state: WNPState | string | number | undefined | null): boolean {
  if (state === undefined || state === null) {
    return false;
  }

  if (typeof state === "number") {
    // Numeric enum: 1 = playing
    return state === 1;
  }

  if (typeof state === "string") {
    // Case-insensitive comparison for "playing"
    return state.toLowerCase() === "playing";
  }

  return false;
}

/**
 * Converts WNP repeat mode to Deskthing repeat state
 * @param repeatMode - WNP repeat mode (NONE/ALL/ONE string or 0/1/2 number)
 * @returns Deskthing repeat state ("off"/"all"/"track")
 */
export function wnpRepeatToDeskthing(
  repeatMode: WNPRepeatMode | string | number | undefined | null
): "off" | "all" | "track" {
  if (repeatMode === undefined || repeatMode === null) {
    return DEFAULTS.repeat_state;
  }

  if (typeof repeatMode === "number") {
    // 0 = off, 1 = track, 2 = all
    switch (repeatMode) {
      case 0:
        return "off";
      case 1:
        return "track";
      case 2:
        return "all";
      default:
        return DEFAULTS.repeat_state;
    }
  }

  if (typeof repeatMode === "string") {
    const normalized = repeatMode.toUpperCase();
    switch (normalized) {
      case "NONE":
        return "off";
      case "ALL":
        return "all";
      case "ONE":
        return "track";
      default:
        return DEFAULTS.repeat_state;
    }
  }

  return DEFAULTS.repeat_state;
}

/**
 * Converts WNP shuffle value to boolean or null
 * @param shuffle - WNP shuffle state (boolean or number)
 * @returns Boolean, or null if undefined
 */
export function wnpShuffleToBoolean(
  shuffle: boolean | number | undefined | null
): boolean | null {
  if (shuffle === undefined || shuffle === null) {
    return null;
  }

  if (typeof shuffle === "boolean") {
    return shuffle;
  }

  if (typeof shuffle === "number") {
    return shuffle !== 0;
  }

  return null;
}

/**
 * Converts WNP artist field (string or string array) to string
 * @param artist - Artist name(s)
 * @returns Comma-separated string or null
 */
export function normalizeArtist(
  artist: string | string[] | undefined | null
): string | null {
  if (artist === undefined || artist === null) {
    return null;
  }

  if (typeof artist === "string") {
    const trimmed = artist.trim();
    return trimmed === "" ? null : trimmed;
  }

  if (Array.isArray(artist)) {
    // Filter out empty strings and join with comma
    const validArtists = artist.filter((a) => typeof a === "string" && a.trim() !== "");
    if (validArtists.length === 0) {
      return null;
    }
    return validArtists.join(", ");
  }

  return null;
}

/**
 * Clamps volume to valid range (0-100)
 * @param volume - Volume value
 * @returns Clamped volume
 */
export function clampVolume(volume: number | undefined | null): number {
  if (volume === undefined || volume === null || isNaN(volume)) {
    return DEFAULTS.volume;
  }

  if (volume < 0) {
    return 0;
  }

  if (volume > 100) {
    return 100;
  }

  return Math.round(volume);
}

/**
 * Builds SongAbilities array from WNP capability flags
 * @param player - WNP player data
 * @returns Array of SongAbilities
 */
export function buildAbilities(player: Partial<WNPPlayer>): SongAbilities[] {
  const abilities: SongAbilities[] = [];

  // can_set_state maps to both PLAY and PAUSE
  if (player.can_set_state) {
    abilities.push(SongAbilities.PLAY, SongAbilities.PAUSE);
  }

  // can_skip_next
  if (player.can_skip_next) {
    abilities.push(SongAbilities.NEXT);
  }

  // can_skip_previous
  if (player.can_skip_previous) {
    abilities.push(SongAbilities.PREVIOUS);
  }

  // can_set_position maps to both REWIND and FAST_FORWARD
  if (player.can_set_position) {
    abilities.push(SongAbilities.REWIND, SongAbilities.FAST_FORWARD);
  }

  // can_set_volume
  if (player.can_set_volume) {
    abilities.push(SongAbilities.CHANGE_VOLUME);
  }

  // can_set_shuffle
  if (player.can_set_shuffle) {
    abilities.push(SongAbilities.SHUFFLE);
  }

  // can_set_repeat
  if (player.can_set_repeat) {
    abilities.push(SongAbilities.REPEAT);
  }

  // can_set_rating
  if (player.can_set_rating) {
    abilities.push(SongAbilities.LIKE);
  }

  return abilities;
}

/**
 * Safely extracts cover URL from WNP data
 * @param player - WNP player data
 * @returns URL string or null
 */
export function extractThumbnail(player: Partial<WNPPlayer>): string | null {
  const url = player.cover_url;

  if (!url || typeof url !== "string") {
    return null;
  }

  const trimmed = url.trim();

  // Basic validation - check if it looks like a URL
  if (trimmed === "" || trimmed.length < 4) {
    return null;
  }

  // Allow data URLs
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  // Allow http/https URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Could be a local file path (from Rainmeter format)
  // For MVP, pass it through - UI will handle display
  return trimmed;
}

/**
 * Safely converts any value to string ID or returns null
 * @param value - Value to convert
 * @returns String ID or null
 */
export function toStringId(value: string | number | undefined | null): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return null;
}

/**
 * Main converter: Transforms WNP player data to SongData11
 * @param player - WNP player data
 * @returns Valid SongData11 object
 */
export function wnpToSongData11(player: Partial<WNPPlayer>): SongData11 {
  // Convert track duration: try seconds first, then time string
  let trackDuration: number | null = null;
  if (player.duration_seconds !== undefined && player.duration_seconds !== null) {
    trackDuration = secondsToMillis(player.duration_seconds);
  } else if (player.duration) {
    trackDuration = timeStringToMillis(player.duration);
  }

  // Convert track progress: try seconds first, then time string
  let trackProgress: number | null = null;
  if (player.position_seconds !== undefined && player.position_seconds !== null) {
    trackProgress = secondsToMillis(player.position_seconds);
  } else if (player.position) {
    trackProgress = timeStringToMillis(player.position);
  }

  // Build the SongData11 payload
  const songData: SongData11 = {
    version: 2,
    source: player.player_name || DEFAULTS.source,
    track_name: player.title?.trim() || DEFAULTS.track_name,
    album: player.album?.trim() || null,
    artist: normalizeArtist(player.artist),
    playlist: null, // Not available from WNP
    playlist_id: null, // Not available from WNP
    shuffle_state: wnpShuffleToBoolean(player.shuffle_active),
    repeat_state: wnpRepeatToDeskthing(player.repeat_mode),
    is_playing: wnpStateToIsPlaying(player.state),
    abilities: buildAbilities(player),
    track_duration: trackDuration,
    track_progress: trackProgress,
    volume: clampVolume(player.volume),
    thumbnail: extractThumbnail(player),
    device: null, // Player display name not available in WNP
    device_id: toStringId(player.id), // Player ID
    id: null, // Track ID not directly available from WNP
  };

  return songData;
}

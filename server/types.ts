/**
 * WNP Protocol Type Definitions
 *
 * Based on WNP-Protocol-Findings.md reverse-engineered protocol research.
 * WNP uses lowercase snake_case for all field names (v2.x/v3.x).
 */

/**
 * Playback state enum
 * Note: WNP protocol uses lowercase values ("playing", "paused", "stopped")
 * but default state in some adapters uses uppercase ("STOPPED")
 */
export enum WNPState {
  PLAYING = 'playing',
  PAUSED = 'paused',
  STOPPED = 'stopped'
}

/**
 * Repeat mode enum
 */
export enum WNPRepeatMode {
  NONE = 'NONE',
  ALL = 'ALL',
  ONE = 'ONE'
}

/**
 * Platform enum for player source
 */
export enum WNPPlatform {
  NONE = 'none',
  WEB = 'web',
  LINUX = 'linux',
  DARWIN = 'darwin',
  WINDOWS = 'windows'
}

/**
 * Rating system types
 */
export enum WNPRatingSystem {
  NONE = 'none',
  LIKE = 'like',
  LIKE_DISLIKE = 'like-dislike',
  SCALE = 'scale'
}

/**
 * Core WNP Player interface
 * Represents the media metadata received from the WNP browser extension
 */
export interface WNPPlayer {
  /** Unique player identifier (v3.0.0+) */
  id?: number;
  /** Name of the media player/source */
  player_name: string;
  /** Track title */
  title: string;
  /** Artist name(s) */
  artist: string;
  /** Album name */
  album: string;
  /** URL to album artwork */
  cover_url: string;
  /** Playback state: playing, paused, or stopped */
  state: WNPState | string;
  /** Duration in "M:SS" format */
  duration: string;
  /** Duration in seconds */
  duration_seconds: number;
  /** Current position in "M:SS" format */
  position: string;
  /** Current position in seconds */
  position_seconds: number;
  /** Position as percentage (0-100) */
  position_percent: number;
  /** Volume level (0-100) */
  volume: number;
  /** Rating value */
  rating: number;
  /** Repeat mode (NONE/ALL/ONE) */
  repeat_mode: WNPRepeatMode | string;
  /** Shuffle state */
  shuffle_active: boolean;
  /** Unix timestamp of update */
  timestamp: number;

  // Extended fields (v3.0.0+)
  /** Source of cover image */
  cover_src?: string;
  /** Rating system type */
  rating_system?: WNPRatingSystem | string;
  /** Bitmask of available repeat modes */
  available_repeat?: number;
  /** Whether play/pause is supported */
  can_set_state?: boolean;
  /** Whether previous track is supported */
  can_skip_previous?: boolean;
  /** Whether next track is supported */
  can_skip_next?: boolean;
  /** Whether seeking is supported */
  can_set_position?: boolean;
  /** Whether volume control is supported */
  can_set_volume?: boolean;
  /** Whether rating can be set */
  can_set_rating?: boolean;
  /** Whether repeat mode can be set */
  can_set_repeat?: boolean;
  /** Whether shuffle can be set */
  can_set_shuffle?: boolean;
  /** Timestamp when player was created */
  created_at?: number;
  /** Timestamp when player was last updated */
  updated_at?: number;
  /** Timestamp when player was last active */
  active_at?: number;
  /** Whether source is web browser */
  is_web_browser?: boolean;
  /** Platform type */
  platform?: WNPPlatform | string;
}

/**
 * WNP Message interface
 * Represents a message received from the browser extension
 */
export interface WNPMessage {
  /** Event type (if specified) */
  event?: string;
  /** Player data */
  player?: WNPPlayer;
  /** Player ID for targeting specific player (v3.0.0+) */
  id?: number;
  /** Raw message data for fallback handling */
  [key: string]: unknown;
}

/**
 * Default WNP player state when no media is playing
 */
export const DEFAULT_WNP_PLAYER: WNPPlayer = {
  state: WNPState.STOPPED,
  player_name: '',
  title: '',
  artist: '',
  album: '',
  cover_url: '',
  duration: '0:00',
  duration_seconds: 0,
  position: '0:00',
  position_seconds: 0,
  position_percent: 0,
  volume: 100,
  rating: 0,
  repeat_mode: WNPRepeatMode.NONE,
  shuffle_active: false,
  timestamp: 0
};

/**
 * Type guard to check if a value is a valid WNPPlayer
 */
export function isWNPPlayer(obj: unknown): obj is WNPPlayer {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const player = obj as Partial<WNPPlayer>;
  return (
    typeof player.player_name === 'string' &&
    typeof player.title === 'string' &&
    typeof player.state === 'string'
  );
}

/**
 * Type guard to check if a value is a valid WNPState
 */
export function isWNPState(state: string): state is WNPState {
  return Object.values(WNPState).includes(state as WNPState);
}

/**
 * Type guard to check if a value is a valid WNPRepeatMode
 */
export function isWNPRepeatMode(mode: string): mode is WNPRepeatMode {
  return Object.values(WNPRepeatMode).includes(mode as WNPRepeatMode);
}

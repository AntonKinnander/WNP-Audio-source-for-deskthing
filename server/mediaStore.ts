/**
 * MediaStore for WNP Audio Source
 *
 * Manages the current WNP player state and handles the flow of data from
 * the WNP server to the Deskthing SDK. Follows the audio app MediaStore pattern.
 *
 * Flow: Browser Extension -> WNP Server -> MediaStore -> Deskthing SDK
 */

import { DeskThing } from "@deskthing/server";
import { SongData11 } from "@deskthing/types";
import { WNPServer } from "./wnpServer.js";
import { wnpToSongData11 } from "./converter.js";
import { WNPRepeatMode } from "./types.js";
import type { WNPPlayer } from "./types.js";

export class MediaStore {
  private static instance: MediaStore;
  private wnpServer: WNPServer;
  private currentPlayer: WNPPlayer | null = null;
  private lastSongData: SongData11 | null = null;

  // Optimistic state overrides (immediate UI feedback, prevents stale-data flash)
  // Each field has its own timestamp for independent timeout tracking
  private optimisticStateOverrides: {
    shuffle_active?: boolean;
    shuffle_active_timestamp?: number;
    repeat_mode?: WNPRepeatMode;
    repeat_mode_timestamp?: number;
    volume?: number;
    volume_timestamp?: number;
    position_seconds?: number;
    position_seconds_timestamp?: number;
  } = {};

  // Play/pause: skip sending updates for 500ms to prevent UI flash
  private suppressSendUntil: number = 0;

  private constructor() {
    // Create a single WNP server instance
    this.wnpServer = new WNPServer(6344);
  }

  public static getInstance(): MediaStore {
    if (!MediaStore.instance) {
      MediaStore.instance = new MediaStore();
    }
    return MediaStore.instance;
  }

  /**
   * Initialize WNP server and set up event listeners
   * Called on app START event
   */
  public async initializeListeners(): Promise<void> {
    console.log('MediaStore: Initializing WNP listeners...');

    // Set up WNP server event listeners
    this.wnpServer.on('connected', () => {
      console.log('MediaStore: WNP client connected');
    });

    this.wnpServer.on('disconnected', () => {
      console.log('MediaStore: WNP client disconnected');
    });

    this.wnpServer.on('playerUpdated', (player: WNPPlayer) => {
      this.handlePlayerUpdate(player);
    });

    this.wnpServer.on('activePlayerChanged', (player: WNPPlayer | null) => {
      console.log('MediaStore: Active player changed');
      if (player) {
        this.handlePlayerUpdate(player);
      }
    });

    this.wnpServer.on('error', (error: Error) => {
      console.error('MediaStore: WNP server error:', error);
    });

    // Start the WNP server
    try {
      await this.wnpServer.start();
      console.log('MediaStore: WNP server started on port 6344');
    } catch (error) {
      console.error('MediaStore: Failed to start WNP server:', error);
      throw error;
    }
  }

  /**
   * Handle player update from WNP server
   * Converts WNP data to SongData11 and sends to Deskthing
   */
  private handlePlayerUpdate(player: WNPPlayer): void {
    // Log raw WNP data
    console.log('═══════════════════════════════════════════════════════════');
    console.log('MediaStore: WNP Player Update Received');
    console.log('───────────────────────────────────────────────────────────');
    console.log(`  Title:       "${player.title}"`);
    console.log(`  Artist:      "${player.artist}"`);
    console.log(`  Album:       "${player.album}"`);
    console.log(`  State:       ${player.state}`);
    console.log(`  Position:    ${player.position} (${player.position_seconds}s)`);
    console.log(`  Duration:    ${player.duration} (${player.duration_seconds}s)`);
    console.log(`  Cover URL:   ${player.cover_url || '(none)'}`);
    console.log(`  Volume:      ${player.volume}%`);
    console.log(`  Repeat:      ${player.repeat_mode}`);
    console.log(`  Shuffle:     ${player.shuffle_active}`);
    console.log('───────────────────────────────────────────────────────────');

    // --- Play/pause suppression ---
    // Skip sending to Deskthing for 500ms after play/pause to prevent UI flash.
    // We still update currentPlayer so state doesn't go stale.
    const suppressSend = Date.now() < this.suppressSendUntil;

    // --- Optimistic state reconciliation ---
    // Each field has independent timeout (2000ms) and exact-match confirmation
    const now = Date.now();
    const TIMEOUT = 2000;

    // Start with a copy of the browser's data, then override where needed
    const adjustedPlayer = { ...player };

    // Volume override
    if (this.optimisticStateOverrides.volume !== undefined) {
      const elapsed = this.optimisticStateOverrides.volume_timestamp ? now - this.optimisticStateOverrides.volume_timestamp : Infinity;
      if (elapsed > TIMEOUT) {
        console.log(`MediaStore: ⏱️ Volume override timed out (${elapsed}ms), clearing`);
        delete this.optimisticStateOverrides.volume;
        delete this.optimisticStateOverrides.volume_timestamp;
      } else if (player.volume === this.optimisticStateOverrides.volume) {
        console.log(`MediaStore: ✅ Volume confirmed by browser (${player.volume}), clearing override`);
        delete this.optimisticStateOverrides.volume;
        delete this.optimisticStateOverrides.volume_timestamp;
      } else {
        console.log(`MediaStore: 🔒 Volume override: browser=${player.volume}, optimistic=${this.optimisticStateOverrides.volume} (${elapsed}ms old)`);
        adjustedPlayer.volume = this.optimisticStateOverrides.volume;
      }
    }

    // Position override
    if (this.optimisticStateOverrides.position_seconds !== undefined) {
      const elapsed = this.optimisticStateOverrides.position_seconds_timestamp ? now - this.optimisticStateOverrides.position_seconds_timestamp : Infinity;
      if (elapsed > TIMEOUT) {
        console.log(`MediaStore: ⏱️ Position override timed out (${elapsed}ms), clearing`);
        delete this.optimisticStateOverrides.position_seconds;
        delete this.optimisticStateOverrides.position_seconds_timestamp;
      } else if (Math.abs(player.position_seconds - this.optimisticStateOverrides.position_seconds) < 1) {
        console.log(`MediaStore: ✅ Position confirmed by browser, clearing override`);
        delete this.optimisticStateOverrides.position_seconds;
        delete this.optimisticStateOverrides.position_seconds_timestamp;
      } else {
        console.log(`MediaStore: 🔒 Position override: browser=${player.position_seconds.toFixed(1)}s, optimistic=${this.optimisticStateOverrides.position_seconds.toFixed(1)}s (${elapsed}ms old)`);
        adjustedPlayer.position_seconds = this.optimisticStateOverrides.position_seconds;
      }
    }

    // Shuffle override
    if (this.optimisticStateOverrides.shuffle_active !== undefined) {
      const elapsed = this.optimisticStateOverrides.shuffle_active_timestamp ? now - this.optimisticStateOverrides.shuffle_active_timestamp : Infinity;
      if (elapsed > TIMEOUT) {
        console.log(`MediaStore: ⏱️ Shuffle override timed out (${elapsed}ms), clearing`);
        delete this.optimisticStateOverrides.shuffle_active;
        delete this.optimisticStateOverrides.shuffle_active_timestamp;
      } else if (player.shuffle_active === this.optimisticStateOverrides.shuffle_active) {
        console.log(`MediaStore: ✅ Shuffle confirmed by browser, clearing override`);
        delete this.optimisticStateOverrides.shuffle_active;
        delete this.optimisticStateOverrides.shuffle_active_timestamp;
      } else {
        adjustedPlayer.shuffle_active = this.optimisticStateOverrides.shuffle_active;
      }
    }

    // Repeat override
    if (this.optimisticStateOverrides.repeat_mode !== undefined) {
      const elapsed = this.optimisticStateOverrides.repeat_mode_timestamp ? now - this.optimisticStateOverrides.repeat_mode_timestamp : Infinity;
      if (elapsed > TIMEOUT) {
        console.log(`MediaStore: ⏱️ Repeat override timed out (${elapsed}ms), clearing`);
        delete this.optimisticStateOverrides.repeat_mode;
        delete this.optimisticStateOverrides.repeat_mode_timestamp;
      } else if (player.repeat_mode === this.optimisticStateOverrides.repeat_mode) {
        console.log(`MediaStore: ✅ Repeat confirmed by browser, clearing override`);
        delete this.optimisticStateOverrides.repeat_mode;
        delete this.optimisticStateOverrides.repeat_mode_timestamp;
      } else {
        adjustedPlayer.repeat_mode = this.optimisticStateOverrides.repeat_mode;
      }
    }

    // Store the current player data (raw, not adjusted) — always update
    this.currentPlayer = player;

    if (suppressSend) {
      console.log('MediaStore: ⏸️ Suppressed send (play/pause debounce)');
      console.log('═══════════════════════════════════════════════════════════');
      return;
    }

    // Convert WNP data to SongData11 (with overrides applied)
    const songData = wnpToSongData11(adjustedPlayer);
    this.lastSongData = songData;

    // Log converted SongData11
    console.log('MediaStore: Converted to SongData11');
    console.log('───────────────────────────────────────────────────────────');
    console.log(`  source:          "${songData.source}"`);
    console.log(`  track_name:      "${songData.track_name}"`);
    console.log(`  artist:          ${songData.artist ? `"${songData.artist}"` : 'null'}`);
    console.log(`  album:           ${songData.album ? `"${songData.album}"` : 'null'}`);
    console.log(`  is_playing:      ${songData.is_playing}`);
    console.log(`  track_duration:  ${songData.track_duration ? `${songData.track_duration}ms` : 'null'}`);
    console.log(`  track_progress:  ${songData.track_progress ? `${songData.track_progress}ms` : 'null'}`);
    console.log(`  volume:          ${songData.volume}`);
    console.log(`  thumbnail:       ${songData.thumbnail ? `"${songData.thumbnail}"` : 'null'}`);
    console.log(`  repeat_state:    "${songData.repeat_state}"`);
    console.log(`  shuffle_state:   ${songData.shuffle_state ?? 'null'}`);
    console.log(`  abilities:       [${songData.abilities.join(', ') || 'empty'}]`);
    console.log('───────────────────────────────────────────────────────────');

    // Send to Deskthing
    DeskThing.sendSong(songData);
    console.log('MediaStore: ✅ Sent song data to Deskthing');
    console.log('═══════════════════════════════════════════════════════════');
  }

  /**
   * Handle GET song request from Deskthing
   * Re-sends the current song data
   */
  public async handleGetSong(): Promise<void> {
    console.log('MediaStore: Handling GET song request');

    if (this.lastSongData) {
      DeskThing.sendSong(this.lastSongData);
      console.log('MediaStore: Re-sent current song data');
    } else {
      console.log('MediaStore: No song data available to send');
    }
  }

  /**
   * Handle REFRESH request from Deskthing
   * Same as GET - re-sends current song data
   */
  public async handleRefresh(): Promise<void> {
    console.log('MediaStore: Handling REFRESH request');
    await this.handleGetSong();
  }

  // ========== Control Handlers (SongEvent.SET) ==========

  /**
   * Handle PLAY command from Deskthing
   */
  public handlePlay(): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: PLAY command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    this.suppressSendUntil = Date.now() + 500;
    this.wnpServer.sendCommand('play');
    console.log('Control: PLAY command flow completed');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle PAUSE command from Deskthing
   */
  public handlePause(): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: PAUSE command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    this.suppressSendUntil = Date.now() + 500;
    this.wnpServer.sendCommand('pause');
    console.log('Control: PAUSE command flow completed');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle NEXT command from Deskthing
   */
  public handleNext(): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: SKIP-NEXT command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    this.wnpServer.skipNext();
    console.log('Control: SKIP-NEXT command flow completed');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle PREVIOUS command from Deskthing
   */
  public handlePrevious(): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: SKIP-PREVIOUS command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    this.wnpServer.skipPrevious();
    console.log('Control: SKIP-PREVIOUS command flow completed');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle STOP command from Deskthing
   * WNP legacy mode: stop = toggle play/pause (event code 0)
   */
  public handleStop(): void {
    this.wnpServer.sendCommand('toggle-play-pause');
  }

  /**
   * Handle SHUFFLE command from Deskthing
   * WNP legacy mode only has SHUFFLE (toggle), so we compare
   * current state and only send if different from requested.
   */
  public handleShuffle(requested: boolean): void {
    console.log('Control: SHUFFLE command received from Deskthing');
    const current = this.optimisticStateOverrides.shuffle_active ??
      this.currentPlayer?.shuffle_active ?? false;
    if (current !== requested) {
      this.wnpServer.sendCommand('shuffle');
      console.log(`Control: Shuffle toggled (${current} → ${requested})`);

      // Optimistic update: immediately reflect in UI
      this.optimisticStateOverrides.shuffle_active = requested;
      this.optimisticStateOverrides.shuffle_active_timestamp = Date.now();

      if (this.currentPlayer) {
        const adjustedPlayer = { ...this.currentPlayer, shuffle_active: requested };
        const songData = wnpToSongData11(adjustedPlayer);
        this.lastSongData = songData;
        DeskThing.sendSong(songData);
      }
    } else {
      console.log(`Control: Shuffle already ${requested}, skipping`);
    }
  }

  /**
   * Handle REPEAT command from Deskthing
   * WNP legacy mode only has REPEAT (cycles NONE→ALL→ONE), so we compare
   * current state and only send if different from requested.
   */
  public handleRepeat(requested: 'all' | 'track' | 'off'): void {
    console.log('Control: REPEAT command received from Deskthing');
    const deskthingToWNP: Record<string, string> = {
      'off': WNPRepeatMode.NONE,
      'all': WNPRepeatMode.ALL,
      'track': WNPRepeatMode.ONE,
    };
    const requestedWNP = deskthingToWNP[requested];
    const currentWNP = this.currentPlayer?.repeat_mode ?? WNPRepeatMode.NONE;
    if (currentWNP !== requestedWNP) {
      this.wnpServer.sendCommand('repeat');
      console.log(`Control: Repeat toggled (${currentWNP} → ${requestedWNP})`);
    } else {
      console.log(`Control: Repeat already ${requestedWNP}, skipping`);
    }
  }

  /**
   * Handle VOLUME command from Deskthing
   * @param volume - Volume level (0-100)
   */
  public handleVolume(volume: number): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: VOLUME command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    const clamped = Math.max(0, Math.min(100, Math.floor(volume)));
    this.optimisticStateOverrides.volume = clamped;
    this.optimisticStateOverrides.volume_timestamp = Date.now();

    // Optimistic update: immediately send to Deskthing
    if (this.currentPlayer) {
      const adjustedPlayer = { ...this.currentPlayer, volume: clamped };
      const songData = wnpToSongData11(adjustedPlayer);
      this.lastSongData = songData;
      DeskThing.sendSong(songData);
    }

    this.wnpServer.setVolume(clamped);
    console.log(`Control: Volume set to ${clamped}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle SEEK command from Deskthing
   * @param positionMs - Position in milliseconds
   */
  public handleSeek(positionMs: number): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: SEEK command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    const positionSeconds = positionMs / 1000;
    this.optimisticStateOverrides.position_seconds = positionSeconds;
    this.optimisticStateOverrides.position_seconds_timestamp = Date.now();

    // Optimistic update: immediately send to Deskthing
    if (this.currentPlayer) {
      const adjustedPlayer = { ...this.currentPlayer, position_seconds: positionSeconds };
      const songData = wnpToSongData11(adjustedPlayer);
      this.lastSongData = songData;
      DeskThing.sendSong(songData);
    }

    this.wnpServer.seekTo(positionSeconds);
    console.log(`Control: Seeked to ${positionSeconds}s (${positionMs}ms)`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle FAST_FORWARD command from Deskthing
   * @param amountMs - Amount to seek forward in milliseconds
   */
  public handleFastForward(amountMs: number): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: FAST_FORWARD command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    const currentPos = this.currentPlayer?.position_seconds ?? 0;
    const newPos = Math.max(0, currentPos + (amountMs / 1000));
    this.optimisticStateOverrides.position_seconds = newPos;
    this.optimisticStateOverrides.position_seconds_timestamp = Date.now();

    // Optimistic update: immediately send to Deskthing
    if (this.currentPlayer) {
      const adjustedPlayer = { ...this.currentPlayer, position_seconds: newPos };
      const songData = wnpToSongData11(adjustedPlayer);
      this.lastSongData = songData;
      DeskThing.sendSong(songData);
    }

    this.wnpServer.seekTo(newPos);
    console.log(`Control: Fast forward ${amountMs}ms → ${newPos}s`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Handle REWIND command from Deskthing
   * @param amountMs - Amount to rewind in milliseconds
   */
  public handleRewind(amountMs: number): void {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Control: REWIND command received from Deskthing');
    console.log('───────────────────────────────────────────────────────────');
    const currentPos = this.currentPlayer?.position_seconds ?? 0;
    const newPos = Math.max(0, currentPos - (amountMs / 1000));
    this.optimisticStateOverrides.position_seconds = newPos;
    this.optimisticStateOverrides.position_seconds_timestamp = Date.now();

    // Optimistic update: immediately send to Deskthing
    if (this.currentPlayer) {
      const adjustedPlayer = { ...this.currentPlayer, position_seconds: newPos };
      const songData = wnpToSongData11(adjustedPlayer);
      this.lastSongData = songData;
      DeskThing.sendSong(songData);
    }

    this.wnpServer.seekTo(newPos);
    console.log(`Control: Rewind ${amountMs}ms → ${newPos}s`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }

  /**
   * Get the current player data
   * Useful for debugging and future control implementations
   */
  public getCurrentPlayer(): WNPPlayer | null {
    return this.currentPlayer;
  }

  /**
   * Get the WNP server instance
   * Useful for sending control commands (v2)
   */
  public getWNPServer(): WNPServer {
    return this.wnpServer;
  }

  /**
   * Stop the MediaStore and WNP server
   * Called on app STOP event
   */
  public async stop(): Promise<void> {
    console.log('MediaStore: Stopping...');
    try {
      // Clear suppression and optimistic overrides
      this.suppressSendUntil = 0;
      this.optimisticStateOverrides = {};

      await this.wnpServer.stop();
      this.currentPlayer = null;
      this.lastSongData = null;
      console.log('MediaStore: Stopped');
    } catch (error) {
      console.error('MediaStore: Error stopping:', error);
    }
  }

  /**
   * Purge all state
   * Called on app PURGE event
   */
  public async purge(): Promise<void> {
    console.log('MediaStore: Purging...');
    await this.stop();
    console.log('MediaStore: Purged');
  }
}

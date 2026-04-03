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
import type { WNPPlayer } from "./types.js";

export class MediaStore {
  private static instance: MediaStore;
  private wnpServer: WNPServer;
  private currentPlayer: WNPPlayer | null = null;
  private lastSongData: SongData11 | null = null;

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
    console.log(`MediaStore: Player update - "${player.title}" by ${player.artist}`);

    // Store the current player data
    this.currentPlayer = player;

    // Convert WNP data to SongData11
    const songData = wnpToSongData11(player);
    this.lastSongData = songData;

    // Send to Deskthing
    DeskThing.sendSong(songData);
    console.log('MediaStore: Sent song data to Deskthing');
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

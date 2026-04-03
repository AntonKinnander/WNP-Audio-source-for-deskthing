import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { EventEmitter } from 'events';
import {
  WNPPlayer,
  WNPMessage,
  WNPState,
  WNPRepeatMode,
  DEFAULT_WNP_PLAYER,
  isWNPPlayer,
  isWNPState
} from './types.js';

const WNP_PORT = 6344;

/**
 * WNP Protocol Field Types
 * Maps the text-based protocol keys to their value types
 */
enum WNPField {
  PLAYER = 'PLAYER',
  TITLE = 'TITLE',
  ARTIST = 'ARTIST',
  ALBUM = 'ALBUM',
  COVER = 'COVER',
  STATE = 'STATE',
  DURATION = 'DURATION',
  POSITION = 'POSITION',
  VOLUME = 'VOLUME',
  RATING = 'RATING',
  REPEAT = 'REPEAT',
  SHUFFLE = 'SHUFFLE'
}

/**
 * State mapping from numeric values to WNPState enum
 * 0 = Stopped, 1 = Playing, 2 = Paused
 */
const STATE_MAP: Record<number, WNPState> = {
  0: WNPState.STOPPED,
  1: WNPState.PLAYING,
  2: WNPState.PAUSED
};

/**
 * Repeat mode mapping from numeric values
 * 0 = None, 1 = All, 2 = One
 */
const REPEAT_MAP: Record<number, WNPRepeatMode> = {
  0: WNPRepeatMode.NONE,
  1: WNPRepeatMode.ALL,
  2: WNPRepeatMode.ONE
};

/**
 * Partial player data for accumulating streaming updates
 */
interface PartialPlayerData {
  player_name?: string;
  title?: string;
  artist?: string;
  album?: string;
  cover_url?: string;
  state?: WNPState;
  duration?: string;
  duration_seconds?: number;
  position?: string;
  position_seconds?: number;
  volume?: number;
  rating?: number;
  repeat_mode?: WNPRepeatMode;
  shuffle_active?: boolean;
  timestamp?: number;
}

/**
 * WNPServer - WebSocket server for WebNowPlaying browser extension
 *
 * This server listens on port 6344 and accepts connections from the WNP browser extension.
 * The extension sends media metadata updates as text-based KEY:VALUE messages.
 *
 * WNP Protocol (actual format from browser extension):
 * - Browser extension connects to ws://localhost:6344
 * - Client sends "RECIPIENT" handshake message upon connection
 * - Server receives text-based KEY:VALUE messages (e.g., "STATE:1", "TITLE:Song Name")
 * - Each field is sent as a separate message
 * - Position updates are sent approximately every second during playback
 *
 * Events emitted:
 * - 'connected': When a client connects
 * - 'disconnected': When a client disconnects
 * - 'playerUpdated': When player data is updated (args: WNPPlayer)
 * - 'activePlayerChanged': When the active player changes (args: WNPPlayer | null)
 * - 'error': When an error occurs (args: Error)
 */
export class WNPServer extends EventEmitter {
  private wss: WebSocketServer | null = null;
  private httpServer: HTTPServer | null = null;
  private port: number;
  private clients: Set<WebSocket> = new Set();
  private _isRunning: boolean = false;

  // Player state tracking
  private players: Map<number, WNPPlayer> = new Map();
  private activePlayerId: number | null = null;

  // Accumulator for streaming protocol updates
  private currentUpdate: PartialPlayerData = {};
  private lastEmittedState: WNPPlayer | null = null;

  constructor(port: number = WNP_PORT) {
    super();
    this.port = port;
  }

  /**
   * Start the WebSocket server on the configured port
   */
  public async start(): Promise<void> {
    if (this._isRunning) {
      console.log(`WNP Server already running on port ${this.port}`);
      return;
    }

    try {
      // Create an HTTP server to pass to WebSocketServer
      this.httpServer = new HTTPServer();

      // Create the WebSocket server
      this.wss = new WebSocketServer({ server: this.httpServer });

      // Handle new connections
      this.wss.on('connection', this.handleConnection.bind(this));

      // Handle server errors
      this.wss.on('error', (error) => {
        console.error('WNP WebSocket Server error:', error);
        this.emit('error', error);
      });

      // Start listening on the configured port
      await new Promise<void>((resolve, reject) => {
        this.httpServer!.listen(this.port, () => {
          this._isRunning = true;
          console.log(`WNP Server listening on port ${this.port}`);
          resolve();
        });

        this.httpServer!.on('error', (error: NodeJS.ErrnoException) => {
          if (error.code === 'EADDRINUSE') {
            reject(new Error(`Port ${this.port} is already in use. Is another WNP adapter running?`));
          } else {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Failed to start WNP Server:', error);
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Stop the WebSocket server and close all connections
   */
  public async stop(): Promise<void> {
    if (!this._isRunning) {
      console.log('WNP Server not running');
      return;
    }

    try {
      // Close all client connections
      for (const client of this.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.close();
        }
      }
      this.clients.clear();

      // Close the WebSocket server
      if (this.wss) {
        await new Promise<void>((resolve) => {
          this.wss!.close(() => resolve());
        });
        this.wss = null;
      }

      // Close the HTTP server
      if (this.httpServer) {
        await new Promise<void>((resolve) => {
          this.httpServer!.close(() => resolve());
        });
        this.httpServer = null;
      }

      // Clear player state
      this.players.clear();
      this.activePlayerId = null;
      this.currentUpdate = {};
      this.lastEmittedState = null;

      this._isRunning = false;
      console.log('WNP Server stopped');
    } catch (error) {
      console.error('Error stopping WNP Server:', error);
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Check if the server is currently running
   */
  public get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Get the currently active player
   * Returns null if no player is active
   */
  public getActivePlayer(): WNPPlayer | null {
    if (this.activePlayerId === null) {
      return null;
    }
    return this.players.get(this.activePlayerId) ?? null;
  }

  /**
   * Get a player by ID
   */
  public getPlayer(id: number): WNPPlayer | undefined {
    return this.players.get(id);
  }

  /**
   * Get all connected players
   */
  public getAllPlayers(): Map<number, WNPPlayer> {
    return new Map(this.players);
  }

  /**
   * Handle a new WebSocket connection
   */
  private handleConnection(ws: WebSocket): void {
    console.log('WNP: New client connected');
    this.emit('connected', ws);

    // Add to clients set
    this.clients.add(ws);

    // Handle incoming messages
    ws.on('message', (data: Buffer) => {
      this.handleMessage(ws, data);
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('WNP: Client disconnected');
      this.clients.delete(ws);
      this.emit('disconnected', ws);
    });

    // Handle client errors
    ws.on('error', (error) => {
      console.error('WNP: Client WebSocket error:', error);
      this.clients.delete(ws);
      this.emit('error', error);
    });
  }

  /**
   * Handle incoming messages from the browser extension
   * Parses text-based KEY:VALUE protocol format
   */
  private handleMessage(ws: WebSocket, data: Buffer): void {
    const message = data.toString().trim();

    // Handle handshake
    if (message === 'RECIPIENT') {
      console.log('WNP: Received RECIPIENT handshake from browser extension');
      return;
    }

    // Parse KEY:VALUE format
    const colonIndex = message.indexOf(':');
    if (colonIndex === -1) {
      console.log('WNP: Received malformed message:', message);
      return;
    }

    const key = message.slice(0, colonIndex) as WNPField;
    const value = message.slice(colonIndex + 1);

    // Process the field
    this.processWNPField(key, value);
  }

  /**
   * Process a single WNP field from the KEY:VALUE protocol
   * Accumulates fields and emits updates when significant changes occur
   */
  private processWNPField(key: string, value: string): void {
    // Skip empty values
    if (value === undefined || value === null) {
      return;
    }

    let hasUpdate = false;

    switch (key as WNPField) {
      case WNPField.PLAYER:
        if (value !== this.currentUpdate.player_name) {
          this.currentUpdate.player_name = value;
          hasUpdate = true;
        }
        break;

      case WNPField.TITLE:
        if (value !== this.currentUpdate.title) {
          this.currentUpdate.title = value;
          hasUpdate = true;
        }
        break;

      case WNPField.ARTIST:
        if (value !== this.currentUpdate.artist) {
          this.currentUpdate.artist = value;
          hasUpdate = true;
        }
        break;

      case WNPField.ALBUM:
        if (value !== this.currentUpdate.album) {
          this.currentUpdate.album = value;
          hasUpdate = true;
        }
        break;

      case WNPField.COVER:
        if (value !== this.currentUpdate.cover_url) {
          this.currentUpdate.cover_url = value;
          hasUpdate = true;
        }
        break;

      case WNPField.STATE:
        const stateNum = parseInt(value, 10);
        const newState = STATE_MAP[stateNum] ?? WNPState.STOPPED;
        if (newState !== this.currentUpdate.state) {
          this.currentUpdate.state = newState;
          hasUpdate = true;
        }
        break;

      case WNPField.DURATION:
        if (value !== this.currentUpdate.duration) {
          this.currentUpdate.duration = value;
          // Parse duration to seconds (M:SS format)
          const durationParts = value.split(':');
          if (durationParts.length === 2) {
            const minutes = parseInt(durationParts[0], 10) || 0;
            const seconds = parseInt(durationParts[1], 10) || 0;
            this.currentUpdate.duration_seconds = minutes * 60 + seconds;
          } else {
            this.currentUpdate.duration_seconds = 0;
          }
          hasUpdate = true;
        }
        break;

      case WNPField.POSITION:
        if (value !== this.currentUpdate.position) {
          this.currentUpdate.position = value;
          // Parse position to seconds (M:SS format)
          const positionParts = value.split(':');
          if (positionParts.length === 2) {
            const minutes = parseInt(positionParts[0], 10) || 0;
            const seconds = parseInt(positionParts[1], 10) || 0;
            this.currentUpdate.position_seconds = minutes * 60 + seconds;
          } else {
            this.currentUpdate.position_seconds = 0;
          }
          // Position updates are frequent; log but don't always emit
          this.emitUpdateIfReady(/* forceOnPosition */ true);
          return;
        }
        break;

      case WNPField.VOLUME:
        const volume = parseInt(value, 10);
        if (!isNaN(volume) && volume !== this.currentUpdate.volume) {
          this.currentUpdate.volume = volume;
          hasUpdate = true;
        }
        break;

      case WNPField.RATING:
        const rating = parseInt(value, 10);
        if (!isNaN(rating) && rating !== this.currentUpdate.rating) {
          this.currentUpdate.rating = rating;
          hasUpdate = true;
        }
        break;

      case WNPField.REPEAT:
        const repeatNum = parseInt(value, 10);
        const newRepeat = REPEAT_MAP[repeatNum] ?? WNPRepeatMode.NONE;
        if (newRepeat !== this.currentUpdate.repeat_mode) {
          this.currentUpdate.repeat_mode = newRepeat;
          hasUpdate = true;
        }
        break;

      case WNPField.SHUFFLE:
        const shuffle = value === '1' || value.toLowerCase() === 'true';
        if (shuffle !== this.currentUpdate.shuffle_active) {
          this.currentUpdate.shuffle_active = shuffle;
          hasUpdate = true;
        }
        break;

      default:
        // Unknown field - log for debugging
        console.log(`WNP: Unknown field "${key}": ${value}`);
        return;
    }

    // Emit update when we have meaningful changes
    if (hasUpdate) {
      this.emitUpdateIfReady();
    }
  }

  /**
   * Emit player update event when accumulated data is ready
   * @param forceOnPosition - Force emission even if only position changed (for progress updates)
   */
  private emitUpdateIfReady(forceOnPosition = false): void {
    // Only emit if we have at least a player name and title (minimum meaningful data)
    if (!this.currentUpdate.player_name || !this.currentUpdate.title) {
      return;
    }

    const player = this.buildPlayerFromUpdate();

    // Check if anything meaningful changed (besides just position)
    const meaningfulChange =
      this.lastEmittedState === null ||
      player.title !== this.lastEmittedState.title ||
      player.artist !== this.lastEmittedState.artist ||
      player.album !== this.lastEmittedState.album ||
      player.cover_url !== this.lastEmittedState.cover_url ||
      player.state !== this.lastEmittedState.state ||
      player.duration_seconds !== this.lastEmittedState.duration_seconds;

    // Log for debugging
    console.log(`WNP: ${player.player_name}: "${player.title}" by ${player.artist}`);
    console.log(`WNP: State: ${player.state}, Pos: ${player.position}/${player.duration}, Vol: ${player.volume}%`);

    // Always update the stored player state
    this.players.set(0, player);
    this.activePlayerId = 0;

    // Emit events
    if (meaningfulChange || forceOnPosition) {
      this.lastEmittedState = player;
      this.emit('playerUpdated', player);

      // Emit active player changed on first meaningful update
      if (meaningfulChange) {
        this.emit('activePlayerChanged', player);
      }
    }
  }

  /**
   * Build a complete WNPPlayer from the accumulated partial update
   */
  private buildPlayerFromUpdate(): WNPPlayer {
    const now = Date.now();

    return {
      id: 0,
      player_name: this.currentUpdate.player_name ?? DEFAULT_WNP_PLAYER.player_name,
      title: this.currentUpdate.title ?? DEFAULT_WNP_PLAYER.title,
      artist: this.currentUpdate.artist ?? DEFAULT_WNP_PLAYER.artist,
      album: this.currentUpdate.album ?? DEFAULT_WNP_PLAYER.album,
      cover_url: this.currentUpdate.cover_url ?? DEFAULT_WNP_PLAYER.cover_url,
      state: this.currentUpdate.state ?? DEFAULT_WNP_PLAYER.state,
      duration: this.currentUpdate.duration ?? DEFAULT_WNP_PLAYER.duration,
      duration_seconds: this.currentUpdate.duration_seconds ?? DEFAULT_WNP_PLAYER.duration_seconds,
      position: this.currentUpdate.position ?? DEFAULT_WNP_PLAYER.position,
      position_seconds: this.currentUpdate.position_seconds ?? DEFAULT_WNP_PLAYER.position_seconds,
      position_percent: this.currentUpdate.duration_seconds && this.currentUpdate.duration_seconds > 0
        ? ((this.currentUpdate.position_seconds ?? 0) / this.currentUpdate.duration_seconds) * 100
        : 0,
      volume: this.currentUpdate.volume ?? DEFAULT_WNP_PLAYER.volume,
      rating: this.currentUpdate.rating ?? DEFAULT_WNP_PLAYER.rating,
      repeat_mode: this.currentUpdate.repeat_mode ?? DEFAULT_WNP_PLAYER.repeat_mode,
      shuffle_active: this.currentUpdate.shuffle_active ?? DEFAULT_WNP_PLAYER.shuffle_active,
      timestamp: now
    };
  }

  /**
   * Normalize and validate player data from WNP message
   * Ensures all required fields exist and have correct types
   */
  private normalizePlayerData(data: unknown): WNPPlayer | null {
    if (!isWNPPlayer(data)) {
      return null;
    }

    const player: WNPPlayer = { ...DEFAULT_WNP_PLAYER, ...data };

    // Normalize state to lowercase
    if (typeof player.state === 'string') {
      const stateLower = player.state.toLowerCase();
      if (isWNPState(stateLower)) {
        (player as unknown as { state: WNPState }).state = stateLower;
      } else {
        // Default to stopped if invalid state
        (player as unknown as { state: WNPState }).state = WNPState.STOPPED;
      }
    }

    // Ensure numeric fields are numbers
    player.duration_seconds = Number(player.duration_seconds) || 0;
    player.position_seconds = Number(player.position_seconds) || 0;
    player.position_percent = Number(player.position_percent) || 0;
    player.volume = Number(player.volume) || 100;
    player.rating = Number(player.rating) || 0;
    player.timestamp = Number(player.timestamp) || Date.now();

    // Ensure boolean fields are booleans
    player.shuffle_active = Boolean(player.shuffle_active);

    return player;
  }

  /**
   * Send a control command to the browser extension
   *
   * @param command - The command to send (e.g., 'play', 'pause', 'skip-next')
   * @param params - Optional parameters for the command
   * @param playerId - Target player ID (uses active player if not specified)
   */
  public sendCommand(
    command: string,
    params?: Record<string, unknown>,
    playerId?: number
  ): void {
    const targetPlayerId = playerId ?? this.activePlayerId ?? 0;
    const message: Record<string, unknown> = {
      command,
      id: targetPlayerId,
      ...params
    };
    const payload = JSON.stringify(message);

    console.log(`WNP: Sending command "${command}" to player ${targetPlayerId}`);

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }

  /**
   * Convenience method for play/pause toggle
   */
  public togglePlayPause(): void {
    const activePlayer = this.getActivePlayer();
    if (activePlayer) {
      const command = activePlayer.state === WNPState.PLAYING ? 'pause' : 'play';
      this.sendCommand(command);
    } else {
      this.sendCommand('play-pause');
    }
  }

  /**
   * Convenience method for skipping to next track
   */
  public skipNext(): void {
    this.sendCommand('skip-next');
  }

  /**
   * Convenience method for skipping to previous track
   */
  public skipPrevious(): void {
    this.sendCommand('skip-previous');
  }

  /**
   * Convenience method for setting volume
   */
  public setVolume(volume: number): void {
    this.sendCommand('set-volume', { volume: Math.max(0, Math.min(100, volume)) });
  }

  /**
   * Convenience method for seeking to position
   */
  public seekTo(positionSeconds: number): void {
    this.sendCommand('set-position', { position: positionSeconds });
  }
}

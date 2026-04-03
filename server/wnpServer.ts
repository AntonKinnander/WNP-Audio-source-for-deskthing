import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { EventEmitter } from 'events';
import {
  WNPPlayer,
  WNPState,
  WNPRepeatMode,
  DEFAULT_WNP_PLAYER
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
  SHUFFLE = 'SHUFFLE',
  // Ability fields (v3.0.0+)
  CAN_SET_STATE = 'CANSETSTATE',
  CAN_SKIP_PREVIOUS = 'CANSKIPPREVIOUS',
  CAN_SKIP_NEXT = 'CANSKIPNEXT',
  CAN_SET_POSITION = 'CANSETPOSITION',
  CAN_SET_VOLUME = 'CANSETVOLUME',
  CAN_SET_RATING = 'CANSETRATING',
  CAN_SET_REPEAT = 'CANSETREPEAT',
  CAN_SET_SHUFFLE = 'CANSETSHUFFLE'
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
  // Ability fields
  can_set_state?: boolean;
  can_skip_previous?: boolean;
  can_skip_next?: boolean;
  can_set_position?: boolean;
  can_set_volume?: boolean;
  can_set_rating?: boolean;
  can_set_repeat?: boolean;
  can_set_shuffle?: boolean;
}

/**
 * WNPServer - WebSocket server for WebNowPlaying browser extension
 *
 * Protocol (from browser extension source socket.ts):
 * 1. Extension connects to ws://127.0.0.1:PORT
 * 2. Extension waits up to 1 second for ADAPTER_VERSION handshake
 * 3. If no handshake, falls back to "legacy" protocol
 * 4. Legacy metadata format: "KEY:VALUE" (e.g., "STATE:1", "TITLE:Song Name")
 * 5. Control commands use NUMERIC event codes:
 *    - 0 = toggle play/pause
 *    - 1 = previous track
 *    - 2 = next track
 *    - 3 <seconds> = seek
 *    - 4 <0-100> = set volume
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
   *
   * WNP protocol: The browser extension connects and waits 1 second for
   * an ADAPTER_VERSION handshake. If none received, it falls back to "legacy"
   * mode which sends KEY:VALUE metadata (what our parser expects).
   *
   * We intentionally stay in legacy mode because:
   * 1. Metadata already works (KEY:VALUE format)
   * 2. Controls use the same numeric codes in all modes
   * 3. Avoids having to update the metadata parser for rev2/rev3
   */
  private handleConnection(ws: WebSocket): void {
    console.log('WNP: New client connected (legacy mode)');
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
   * Parses text-based KEY:VALUE protocol format (legacy mode)
   */
  private handleMessage(_ws: WebSocket, data: Buffer): void {
    const message = data.toString().trim();

    // Parse KEY:VALUE format (legacy protocol from browser extension)
    const colonIndex = message.indexOf(':');
    if (colonIndex === -1) {
      console.log(`WNP: Received non-KEY:VALUE message: "${message}"`);
      return;
    }

    const key = message.slice(0, colonIndex);
    const value = message.slice(colonIndex + 1);

    // Log raw WNP message (useful for debugging)
    console.log(`WNP: 📨 ${key}: "${value}"`);

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

      // Ability fields - indicate which controls are supported
      case WNPField.CAN_SET_STATE:
        this.currentUpdate.can_set_state = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SKIP_PREVIOUS:
        this.currentUpdate.can_skip_previous = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SKIP_NEXT:
        this.currentUpdate.can_skip_next = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SET_POSITION:
        this.currentUpdate.can_set_position = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SET_VOLUME:
        this.currentUpdate.can_set_volume = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SET_RATING:
        this.currentUpdate.can_set_rating = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SET_REPEAT:
        this.currentUpdate.can_set_repeat = value === '1' || value.toLowerCase() === 'true';
        break;

      case WNPField.CAN_SET_SHUFFLE:
        this.currentUpdate.can_set_shuffle = value === '1' || value.toLowerCase() === 'true';
        break;

      default:
        // Unknown field - log for debugging but don't return
        // This allows us to see new fields that might be added
        console.log(`WNP: ℹ️  Unknown field "${key}": ${value}`);
        // Don't return - just log and continue
        break;
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
      timestamp: now,
      // Ability fields (v3.0.0+)
      can_set_state: this.currentUpdate.can_set_state,
      can_skip_previous: this.currentUpdate.can_skip_previous,
      can_skip_next: this.currentUpdate.can_skip_next,
      can_set_position: this.currentUpdate.can_set_position,
      can_set_volume: this.currentUpdate.can_set_volume,
      can_set_rating: this.currentUpdate.can_set_rating,
      can_set_repeat: this.currentUpdate.can_set_repeat,
      can_set_shuffle: this.currentUpdate.can_set_shuffle
    };
  }

  /**
   * Send a control command to the browser extension
   *
   * WNP Control Command Format (from browser extension source content.ts):
   * Commands are NUMERIC event codes sent as plain text:
   *   0 = toggle play/pause
   *   1 = previous track
   *   2 = next track
   *   3 <seconds> = seek to position
   *   4 <0-100> = set volume
   *   5 = toggle repeat
   *   6 = toggle shuffle
   *   7 = toggle thumbs up
   *   8 = toggle thumbs down
   *   9 <rating> = set rating
   *
   * @param command - The command to send (e.g., 'play', 'pause', 'skip-next')
   * @param params - Optional parameters for the command
   * @param playerId - Target player ID (unused in legacy mode)
   */
  public sendCommand(
    command: string,
    params?: Record<string, unknown>,
    _playerId?: number
  ): void {
    // Map command names to numeric event codes
    const commandMap: Record<string, string> = {
      'toggle-playing': '0',
      'play': '0',           // Toggle (same as play/pause in legacy)
      'pause': '0',          // Toggle (same as play/pause in legacy)
      'play-pause': '0',
      'skip-previous': '1',
      'previous': '1',
      'skip-next': '2',
      'next': '2',
      'set-position': '3',
      'seek': '3',
      'set-volume': '4',
      'volume': '4',
      'toggle-repeat': '5',
      'repeat': '5',
      'toggle-shuffle': '6',
      'shuffle': '6',
      'thumbs-up': '7',
      'thumbs-down': '8',
      'set-rating': '9',
    };

    const eventCode = commandMap[command.toLowerCase()] ?? null;
    if (eventCode === null) {
      console.log(`WNP: Unknown command "${command}"`);
      return;
    }

    // Build the message: event code + optional data
    let message = eventCode;
    if (params) {
      if (params.position !== undefined) {
        message = `3 ${Math.floor(Number(params.position))}`;
      } else if (params.volume !== undefined) {
        message = `4 ${Math.max(0, Math.min(100, Math.floor(Number(params.volume))))}`;
      } else if (params.rating !== undefined) {
        message = `9 ${Math.floor(Number(params.rating))}`;
      }
    }

    console.log(`WNP: >>> Sending control: "${command}" → "${message}"`);

    const openClientCount = Array.from(this.clients).filter(c => c.readyState === WebSocket.OPEN).length;
    console.log(`WNP: >>> Sending to ${openClientCount}/${this.clients.size} clients`);

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }

    console.log(`WNP: >>> Control "${command}" sent`);
  }

  /**
   * Convenience method for play/pause toggle
   * Uses event code 0 (TOGGLE_PLAYING)
   */
  public togglePlayPause(): void {
    this.sendCommand('toggle-play-pause');
  }

  /**
   * Convenience method for skipping to next track
   * Uses event code 2 (NEXT)
   */
  public skipNext(): void {
    this.sendCommand('next');
  }

  /**
   * Convenience method for skipping to previous track
   * Uses event code 1 (PREVIOUS)
   */
  public skipPrevious(): void {
    this.sendCommand('previous');
  }

  /**
   * Convenience method for setting volume
   * Uses event code 4 (SET_VOLUME)
   */
  public setVolume(volume: number): void {
    this.sendCommand('set-volume', { volume: Math.max(0, Math.min(100, volume)) });
  }

  /**
   * Convenience method for seeking to position
   * Uses event code 3 (SET_POSITION)
   */
  public seekTo(positionSeconds: number): void {
    this.sendCommand('set-position', { position: positionSeconds });
  }
}

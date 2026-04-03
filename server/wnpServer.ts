import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { EventEmitter } from 'events';
import {
  WNPPlayer,
  WNPMessage,
  WNPState,
  DEFAULT_WNP_PLAYER,
  isWNPPlayer,
  isWNPState
} from './types.js';

const WNP_PORT = 6344;

/**
 * WNPServer - WebSocket server for WebNowPlaying browser extension
 *
 * This server listens on port 6344 and accepts connections from the WNP browser extension.
 * The extension sends media metadata updates as JSON messages.
 *
 * WNP Protocol:
 * - Browser extension connects to ws://localhost:6344
 * - Client sends "RECIPIENT" handshake message upon connection
 * - Server receives JSON metadata updates (title, artist, album, cover_url, etc.)
 *
 * Events emitted:
 * - 'connected': When a client connects
 * - 'disconnected': When a client disconnects
 * - 'playerUpdated': When player data is received (args: WNPPlayer)
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
   */
  private handleMessage(ws: WebSocket, data: Buffer): void {
    const message = data.toString();

    // Handle handshake
    if (message === 'RECIPIENT') {
      console.log('WNP: Received RECIPIENT handshake from browser extension');
      return;
    }

    // Parse JSON message
    try {
      const parsed = JSON.parse(message) as WNPMessage;
      this.processWNPMessage(parsed);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('WNP: Received non-JSON message:', message);
      } else {
        console.error('WNP: Error processing message:', error);
        this.emit('error', error);
      }
    }
  }

  /**
   * Process a parsed WNP message and update player state
   */
  private processWNPMessage(message: WNPMessage): void {
    // Handle player update (may be nested or direct)
    let playerData: unknown = message.player ?? message;

    // Extract player ID if present
    const playerId = message.id ?? (playerData as Partial<WNPPlayer>).id;

    // Validate and normalize player data
    const player = this.normalizePlayerData(playerData);

    if (player === null) {
      console.log('WNP: Received invalid player data:', playerData);
      return;
    }

    // Log incoming player data for debugging
    console.log(`WNP: Player update - ${player.player_name}: "${player.title}" by ${player.artist}`);
    console.log(`WNP: State: ${player.state}, Position: ${player.position}/${player.duration}`);

    // Update or create player entry
    if (playerId !== undefined) {
      this.players.set(playerId, player);
    } else {
      // For messages without ID, use a default ID (0)
      this.players.set(0, player);
    }

    // Update active player (most recently updated becomes active)
    const newActiveId = playerId ?? 0;
    if (this.activePlayerId !== newActiveId) {
      this.activePlayerId = newActiveId;
      console.log(`WNP: Active player changed to ID ${newActiveId}`);
      this.emit('activePlayerChanged', this.getActivePlayer());
    }

    // Emit player update event
    this.emit('playerUpdated', player);
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

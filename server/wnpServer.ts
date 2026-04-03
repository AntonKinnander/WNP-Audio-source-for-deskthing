import { WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';

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
 */
export class WNPServer {
  private wss: WebSocketServer | null = null;
  private httpServer: HTTPServer | null = null;
  private port: number;
  private clients: Set<WebSocket> = new Set();
  private _isRunning: boolean = false;

  constructor(port: number = WNP_PORT) {
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

      this._isRunning = false;
      console.log('WNP Server stopped');
    } catch (error) {
      console.error('Error stopping WNP Server:', error);
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
   * Handle a new WebSocket connection
   */
  private handleConnection(ws: WebSocket): void {
    console.log('WNP: New client connected');

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
    });

    // Handle client errors
    ws.on('error', (error) => {
      console.error('WNP: Client WebSocket error:', error);
      this.clients.delete(ws);
    });
  }

  /**
   * Handle incoming messages from the browser extension
   * Message handling will be implemented in the next phase (03-02)
   */
  private handleMessage(ws: WebSocket, data: Buffer): void {
    const message = data.toString();

    // Log handshake for debugging
    if (message === 'RECIPIENT') {
      console.log('WNP: Received RECIPIENT handshake from browser extension');
      return;
    }

    // For now, just log that we received a message
    // Message parsing will be implemented in phase 03-02
    try {
      // Try to parse as JSON to see what we're receiving
      const parsed = JSON.parse(message);
      console.log('WNP: Received message:', parsed);
    } catch {
      // Not JSON, just log the raw message
      console.log('WNP: Received non-JSON message:', message);
    }
  }

  /**
   * Send a control command to the browser extension
   * Control command implementation will be in phase 03-02
   */
  public sendCommand(command: string, params?: Record<string, unknown>): void {
    const message = params ? { command, ...params } : { command };
    const payload = JSON.stringify(message);

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }
}

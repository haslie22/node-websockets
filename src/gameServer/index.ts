import { WebSocketServer } from 'ws';
// import { Database } from '../database/database';

class GameServer {
  private wsServer: WebSocketServer;
  // private db: Database;

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
    // this.db = db;
    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers(): void {
    this.wsServer.on('connection', (ws) => {
      console.log('New client connected');
      console.log(this.wsServer.clients);

      ws.on('message', (message: string) => {
        console.log(`Received message: ${message}`);
        // ws.send(`Server received your message: ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }
}

export default GameServer;

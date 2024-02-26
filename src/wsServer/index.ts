import { WebSocketServer, Server } from 'ws';

class WSServer {
  server: Server;

  constructor(port: number, clientTracking: boolean) {
    this.server = new WebSocketServer({ port, clientTracking });
  }

  start(port: number): void {
    this.server.on('listening', () => {
      console.log(`WebSocket server is running on port ${port}`);
    });

    this.server.on('error', (error) => {
      console.error(`WebSocket server encountered an error: ${error}`);
    });

    this.server.on('close', () => {
      this.stop();
      console.log('WebSocket server has stopped');
    });
  }

  stop(): void {
    this.server.clients.forEach((client) => {
      client.close();
    });
  }
}

export default WSServer;

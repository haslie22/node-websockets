import { WebSocketServer, Server } from 'ws';
import WSServerHandler from './WSServerHandler';
import { Notifications } from '../shared/constants/constants';

class WSServer {
  private server: Server;
  private messageCallback: (type: unknown) => (data: unknown) => void;

  constructor(port: number, clientTracking: boolean, cb: (type: unknown) => (data: unknown) => void) {
    this.server = new WebSocketServer({ port, clientTracking });
    this.messageCallback = cb;

    this.start(port);
  }

  start(port: number): void {
    this.server.on('listening', () => {
      console.log(`${Notifications.WS_RUNNING} ${port}`);
    });

    this.server.on('connection', (socket) => {
      new WSServerHandler(this.server, this.messageCallback).connect(socket);
    });

    this.server.on('error', (error) => {
      console.error(`${Notifications.WS_ERROR} ${error}`);
    });

    this.server.on('close', () => {
      this.stop();
      console.log(`${Notifications.WS_STOP}`);
    });
  }

  stop(): void {
    this.server.clients.forEach((client) => {
      client.close();
    });
  }
}

export default WSServer;

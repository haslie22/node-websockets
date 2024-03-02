import { WebSocketServer, WebSocket, RawData } from 'ws';
import parseMessage from '../shared/helpers/parseData';
import { Notifications } from '../shared/constants/constants';

class WSServerHandler {
  private server: WebSocketServer;
  private socket: WebSocket;
  private messageCallback: (type: unknown) => (data: unknown) => void;

  constructor(server: WebSocketServer, cb: (type: unknown) => (data: unknown) => void) {
    this.server = server;
    this.messageCallback = cb;
  }

  connect(socket: WebSocket): void {
    this.socket = socket;

    this.socket.on('message', this.handleMessage);
    this.socket.on('close', this.handleClose);
    this.socket.on('error', this.handleError);
  }

  private handleMessage = (rawData: RawData): void => {
    const { type, data } = parseMessage(rawData);

    const cb = this.messageCallback(type);
    cb(data);
  };

  private handleClose = (): void => {};

  private handleError = (error: Error): void => {
    console.error(`${Notifications.WS_ERROR} ${error.message}`);
  };
}

export default WSServerHandler;

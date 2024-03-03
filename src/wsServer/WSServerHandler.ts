import { WebSocketServer, WebSocket, RawData } from 'ws';
import parseMessage from '../shared/helpers/parseData';
import { Notifications } from '../shared/constants/constants';
import { WebSocketExtended } from '../shared/types/types';

class WSServerHandler {
  private server: WebSocketServer;
  private socket: WebSocketExtended;
  private currentUserId: string = '';
  private messageCallback: (
    type: unknown,
  ) => (data: unknown, socket: WebSocket, currentUserId: string) => Promise<string>;

  constructor(
    server: WebSocketServer,
    cb: (type: unknown) => (data: unknown, socket: WebSocket, currentUserId: string) => Promise<string>,
  ) {
    this.server = server;
    this.messageCallback = cb;
  }

  connect(socket: WebSocket): void {
    this.socket = socket as WebSocketExtended;
    this.socket.playerId = '';

    this.socket.on('message', this.handleMessage);
    this.socket.on('close', this.handleClose);
    this.socket.on('error', this.handleError);
  }

  private handleMessage = async (rawData: RawData): Promise<void> => {
    const { type, data } = parseMessage(rawData);

    const cb = this.messageCallback(type);
    this.currentUserId = await cb(data, this.socket, this.currentUserId);
  };

  private handleClose = (): void => {};

  private handleError = (error: Error): void => {
    console.error(`${Notifications.WS_ERROR} ${error.message}`);
  };
}

export default WSServerHandler;

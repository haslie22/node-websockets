import { WebSocket } from 'ws';

export type PlayerId = string;
export type GameId = string;
export type RoomId = string;
export type WinnerId = string;

export interface Message<T> {
  type: string;
  data: T;
  id: number;
}

export interface WebSocketExtended extends WebSocket {
  playerId: PlayerId;
}

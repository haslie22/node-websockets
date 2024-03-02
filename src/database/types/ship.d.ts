import { GameId, PlayerId } from '../../shared/types/types';

export enum ShipType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge',
}

export interface ShipPosition {
  x: number;
  y: number;
}

export interface Ship {
  position: ShipPosition;
  direction: boolean;
  length: number;
  type: ShipType;
}

export interface ShipBoard {
  // request
  gameId: GameId;
  ships: Ship[];
  indexPlayer: PlayerId;
}

export interface StartGameResponseData {
  ships: Ship[];
  currentPlayerIndex: PlayerId;
}

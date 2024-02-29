import { GameId, PlayerId } from '../../shared/types/types';
import { ShipPosition } from './ship';

export enum AttackStatus {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export interface Game {
  id: GameId;
  players: PlayerId[];
}

export interface GameData {
  idGame: GameId;
  idPlayer: PlayerId;
}

export interface AttackData extends ShipPosition {
  gameId: GameId;
  indexPlayer: PlayerId;
}

export interface AttackFeedbackData {
  position: ShipPosition;
  currentPlayer: PlayerId;
  status: AttackStatus;
}

export interface RandomAttackData {
  gameId: GameId;
  indexPlayer: PlayerId;
}

export interface TurnInfoData {
  currentPlayer: PlayerId;
}

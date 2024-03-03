import { GameId, PlayerId, RoomId } from '../../shared/types/types';
import { Player } from './player';

export interface Room {
  id: RoomId;
  players: Player[];
}

export interface RoomUser {
  name: string;
  index: PlayerId;
}

export interface AddUserToRoomData {
  // request
  indexRoom: RoomId;
}

export interface CreateGameResponseData {
  idGame: GameId;
  idPlayer: PlayerId;
}

export interface RoomData {
  roomId: RoomId;
  roomUsers: PlayerId[];
}

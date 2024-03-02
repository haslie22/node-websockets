import { GameId, PlayerId, RoomId } from '../../shared/types/types';

export interface Room {
  id: RoomId;
  players: PlayerId[];
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

export enum MessagePlayer {
  REG = 'reg',
}

export enum MessageRoom {
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
}

export enum MessageShips {
  ADD_SHIPS = 'add_ships',
}

export enum MessageGame {
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

export type MessageType = MessagePlayer | MessageRoom | MessageShips | MessageGame;

export interface Message<T> {
  type: MessageType;
  data: T;
  id: 0;
}

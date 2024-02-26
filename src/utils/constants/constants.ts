enum DefaultPorts {
  HTTP = 8181,
  WS = 3000,
}

enum PlayerRequests {
  REG = 'reg',
}

enum RoomRequests {
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
}

enum ShipsRequests {
  ADD_SHIPS = 'add_ships',
}

enum GameRequests {
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

const Requests = {
  player: PlayerRequests,
  room: RoomRequests,
  ships: ShipsRequests,
  game: GameRequests,
};

export { DefaultPorts, Requests };

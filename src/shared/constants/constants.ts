enum DefaultPorts {
  HTTP = 8181,
  WS = 3000,
}

enum MessageType {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_ROOM = 'update_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  UPDATE_WINNERS = 'update_winners',
}

const Notifications = {
  HTTP_RUNNING: 'HTTP server is running on port',
  HTTP_STOP: 'HTTP server stopped',
  WS_RUNNING: 'WebSocket server is running on port',
  WS_ERROR: 'WebSocket server encountered an error',
  WS_STOP: 'WebSocket server stopped',
  PARSE_FAIL_TYPE: 'Failed to parse message type',
  PARSE_FAIL_DATA: 'Failed to parse message data',
  INCORRECT_PASSWORD: 'Provided password is incorrect for this username',
  UNKNOWN_ERROR: 'Unknown error occurred',
  ALREADY_IN_ROOM: 'This player is already in the room, choose another one',
};

export { DefaultPorts, MessageType, Notifications };

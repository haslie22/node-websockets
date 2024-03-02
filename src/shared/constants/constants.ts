enum DefaultPorts {
  HTTP = 8181,
  WS = 3000,
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
};

export { DefaultPorts, Notifications };

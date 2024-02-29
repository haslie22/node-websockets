/* eslint-disable @typescript-eslint/no-unused-vars */

import HTTPServer from './httpServer/index';
import GameServer from './gameServer';
import { DefaultPorts } from './shared/constants/constants';
import { WebSocketServer } from 'ws';

const BASE_HTTP_PORT = parseInt(process.env.PORT_HTTP, 10) || DefaultPorts.HTTP;
const BASE_WS_PORT = parseInt(process.env.PORT_WS, 10) || DefaultPorts.WS;

const httpServer = new HTTPServer(BASE_HTTP_PORT);
const wsServer = new WebSocketServer({ port: BASE_WS_PORT, clientTracking: true });
const gameServer = new GameServer(wsServer);

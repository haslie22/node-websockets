/* eslint-disable @typescript-eslint/no-unused-vars */

import GameServer from './gameServer';
import { DefaultPorts } from './shared/constants/constants';

const BASE_HTTP_PORT = parseInt(process.env.PORT_HTTP, 10) || DefaultPorts.HTTP;
const BASE_WS_PORT = parseInt(process.env.PORT_WS, 10) || DefaultPorts.WS;

const gameServer = new GameServer(BASE_HTTP_PORT, BASE_WS_PORT);

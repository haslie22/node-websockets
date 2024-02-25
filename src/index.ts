import httpServer from './httpServer/index';
import { DefaultPorts } from './utils/constants/constants';

const BASE_PORT = parseInt(process.env.PORT_HTTP, 10) || DefaultPorts.HTTP;

console.log(`Start static http server on the ${BASE_PORT} port!`);
httpServer.listen(BASE_PORT);

import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { createServer, Server, IncomingMessage, ServerResponse } from 'http';

class HTTPServer {
  server: Server;

  constructor(port: number) {
    this.server = createServer(this.handleRequest.bind(this));
    this.start(port);
  }

  async handleRequest(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> {
    const __dirname = resolve(dirname(''));
    const filePath = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);

    try {
      const fileContent = await readFile(filePath);
      res.writeHead(200);
      res.end(fileContent);
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
    }
  }

  start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  stop(): void {
    this.server.close(() => {
      console.log('Server has stopped');
    });
  }
}

export default HTTPServer;

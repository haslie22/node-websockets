import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { createServer } from 'http';

const httpServer = createServer(async (req, res) => {
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
});

export default httpServer;

import express, { Request, Response } from 'express';
import { router } from './routes';
import { configDotenv } from 'dotenv';
// configurar mongodb

configDotenv();
const server = express();

server.use(express.json());
server.use(router);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

server.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ healthcheck: "ok" });
})

server.listen(process.env.BACKENDPORT, () => console.log(`PizzAPI Backend rodando em: http://127.0.0.1:${process.env.BACKENDPORT}/`));
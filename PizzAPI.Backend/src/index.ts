import { MongoClient, Db } from "mongodb";
import express from 'express';
import { configDotenv } from 'dotenv';
import { createRoutes } from './routes';

configDotenv();

const client = new MongoClient(process.env.MONGODB_URI!);
let db: Db;

async function connectMongo() {
  try {
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME);
    console.log("Conectado ao MongoDB");

    const server = express();
    server.use(express.json());
    server.use(createRoutes(db));

    server.listen(process.env.BACKENDPORT, () => {
      console.log(`PizzAPI Backend rodando em: http://127.0.0.1:${process.env.BACKENDPORT}/`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

connectMongo();
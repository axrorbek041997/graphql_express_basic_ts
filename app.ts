import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import authModule from './modules/auth/index.js'
import authMiddleware from './utils/middlewares/auth.js'

async function startServer() {
  const app = express();
  app.use(authMiddleware);
  app.use(cors(), express.json());

  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: [authModule.typeDefs],
    resolvers: [authModule.resolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // @ts-ignore
  app.use(expressMiddleware(server))

  httpServer.listen({ port: 4000 }, () => console.log(`🚀 Server ready at 4000 port`))
}
startServer()

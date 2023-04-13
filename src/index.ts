import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildFederatedSchema } from '@apollo/federation';
import { readFileSync } from 'fs';
import admin from 'firebase-admin';

// Initialize Firebase
const firebaseServiceAccount = JSON.parse(
  readFileSync('./config/firebaseServiceAccountKey.json', 'utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount)
});

import { typeDefs, resolvers } from './graphql';

const main = async () => {
  const app = express();
  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  });

  const PORT = 4001;

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
  
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});



import dotenv from 'dotenv-safe';
import getApolloServerConfig from '@src/lib/config/apolloServerConfig';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

const isCIPipeline = process.env.NODE_ENV === 'CI';

// we don't want to access the dotenv in CI pipeline
if (!isCIPipeline) {
  dotenv.config({
    allowEmptyValues: true,
  });
}

const runningEnvironmant = process.env.NODE_ENV || 'production';

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer(
    getApolloServerConfig(runningEnvironmant, httpServer)
  );

  //Apply the Apollo GraphQL middleware and set the path to /api

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/api',
  });
  app.get('/', (req, res) => res.send('Hello World'));

  const port = process.env.PORT || 4001;
  // Modified server startup
  await new Promise<void>(resolve =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer();

// import { ApolloServer } from 'apollo-server';
// import dotenv from 'dotenv-safe';
// import getApolloServerConfig from '@src/lib/config/apolloServerConfig';

// if (process.env.NODE_ENV !== 'CI') {
//   dotenv.config({
//     allowEmptyValues: true,
//   });
// }

// const runningEnvironmant = process.env.NODE_ENV || 'production';

// console.log(runningEnvironmant);

// const startServer = () => {
//   const server = new ApolloServer(getApolloServerConfig(runningEnvironmant));

//   server
//     .listen({
//       port: 4001,
//     })
//     .then(({ url }) => {
//       console.log(`🚀  Server ready at ${url}graphql`);
//     })
//     .catch(err => console.log('Error launching server', err));
// };

// startServer();

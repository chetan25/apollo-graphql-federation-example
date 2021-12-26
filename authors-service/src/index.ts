import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';

const isCIPipeline = process.env.NODE_ENV === 'CI';

// we don't want to access the dotenv in CI pipeline
if (!isCIPipeline) {
  dotenv.config({
    allowEmptyValues: true,
  });
}

const startServer = () => {
  const server = new ApolloServer(apolloServerConfig);

  server
    .listen({
      port: 4002,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch(err => console.log('Error launching server', err));
};

startServer();

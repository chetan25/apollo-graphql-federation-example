import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';
import getApolloServerConfig from '@src/lib/config/apolloServerConfig';

const isCIPipeline = process.env.NODE_ENV === 'CI';

// we don't want to access the dotenv in CI pipeline
if (!isCIPipeline) {
  dotenv.config({
    allowEmptyValues: true,
  });
}

const runningEnvironmant = process.env.NODE_ENV || 'production';

console.log(runningEnvironmant);

const startServer = () => {
  const server = new ApolloServer(getApolloServerConfig(runningEnvironmant));

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

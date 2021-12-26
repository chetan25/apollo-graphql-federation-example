import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';
import getApolloServerConfig from '@src/lib/config/apolloServerConfig';

dotenv.config({
  allowEmptyValues: true,
});

const runningEnvironmant = process.env.NODE_ENV || 'production';

console.log(runningEnvironmant);

const startServer = () => {
  const server = new ApolloServer(getApolloServerConfig(runningEnvironmant));

  server
    .listen({
      port: 4001,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch(err => console.log('Error launching server', err));
};

startServer();

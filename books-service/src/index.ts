import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    allowEmptyValues: true,
  });
}
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');

const startServer = () => {
  const server = new ApolloServer(apolloServerConfig);

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

import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';

dotenv.config({
  allowEmptyValues: true,
});

const startServer = () => {
  let gateway;
  if (process.env.NODE_ENV !== 'development') {
    gateway = new ApolloGateway({
      debug: true,
    });
  } else {
    console.log('development');
    gateway = new ApolloGateway({
      serviceList: [
        {
          name: 'books',
          url: process.env.BOOKS_SERVICE_URL,
        },
        {
          name: 'authors',
          url: process.env.AUTHORS_SERVICE_URL,
        },
      ],
      debug: true,
    });
  }

  const server = new ApolloServer({
    gateway,
    playground: process.env.NODE_ENV !== 'production',
    engine: {
      apiKey: process.env.APOLLO_KEY,
    },
    subscriptions: false,
  });

  server
    .listen({
      port: 4000,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch(err => console.log('Error launching server', err));
};

startServer();

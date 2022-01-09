import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv-safe';

// if (process.env.NODE_ENV === 'development') {
//   dotenv.config({
//     allowEmptyValues: true,
//   });
// }

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
          url: 'http://localhost:4001/api',
        },
        {
          name: 'authors',
          url: 'http://localhost:4002/api',
        },
      ],
      debug: true,
    });
  }

  const server = new ApolloServer({
    gateway,
    playground: process.env.NODE_ENV === 'development',
    introspection: process.env.NODE_ENV === 'development',
    engine: {
      apiKey:
        process.env.NODE_ENV !== 'development' ? process.env.APOLLO_KEY : '',
    },
    subscriptions: false,
  });

  const port = process.env.PORT || 4000;

  server
    .listen({
      port: port,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch(err => console.log('Error launching server', err));
};

startServer();

import apolloServerContext from '@src/lib/config/apolloServerContext';
import schema from '@src/graphql/schema/schema';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { Server } from 'http';

const getApolloServerConfig = (
  runningEnvironmant: string,
  httpServer: Server
) => {
  const isDevelopment = runningEnvironmant === 'development';
  const isCIPipeline = runningEnvironmant === 'CI';

  return {
    schema,
    playground: isDevelopment,
    introspection: isDevelopment || isCIPipeline,
    context: apolloServerContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  };
};

export default getApolloServerConfig;

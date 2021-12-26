import apolloServerContext from '@src/lib/config/apolloServerContext';
import schema from '@src/graphql/schema/schema';

const getApolloServerConfig = (runningEnvironmant: string) => {
  const isDevelopment = runningEnvironmant === 'development';
  const isCIPipeline = runningEnvironmant === 'CI';

  return {
    schema,
    playground: isDevelopment,
    introspection: isDevelopment || isCIPipeline,
    context: apolloServerContext,
  };
};

export default getApolloServerConfig;

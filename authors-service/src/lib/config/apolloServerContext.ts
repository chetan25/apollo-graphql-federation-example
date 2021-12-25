import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { models } from '@src/db';

const apolloServerContext: IApolloServerContext = {
  authorsModel: models.authors,
};

export default apolloServerContext;

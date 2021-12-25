import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { models } from '@src/db';

const apolloServerContext: IApolloServerContext = {
  booksModel: models.books,
};

export default apolloServerContext;

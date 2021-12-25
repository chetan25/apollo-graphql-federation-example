import { models } from '@src/db';

export interface IApolloServerContext {
  authorsModel: typeof models.authors;
}

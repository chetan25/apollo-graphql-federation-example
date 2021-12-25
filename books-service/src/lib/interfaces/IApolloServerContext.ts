import { models } from '@src/db';

export interface IApolloServerContext {
  booksModel: typeof models.books;
}

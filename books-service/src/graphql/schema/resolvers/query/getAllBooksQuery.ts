import { GraphQLFieldResolver } from 'graphql';
import { BookItem } from '@src/db/books-model';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

const getAllBooksQuery: GraphQLFieldResolver<unknown, IApolloServerContext> = (
  _source,
  _args,
  _context,
  _info
): BookItem[] => {
  const { booksModel } = _context;
  const books = booksModel.getAllBooks();
  return books;
};

export default getAllBooksQuery;

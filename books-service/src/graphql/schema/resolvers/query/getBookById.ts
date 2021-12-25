import { GraphQLFieldResolver } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { BookItem } from '@src/db/books-model';

const getBookById: GraphQLFieldResolver<unknown, IApolloServerContext> = (
  _source,
  { bookId },
  _context,
  _info
): BookItem | {} => {
  const { booksModel } = _context;
  const books = booksModel.getBooksById(bookId);

  return books;
};

export default getBookById;

import { GraphQLFieldResolver } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { BookItem } from '@src/db/books-model';

const getBooksByAuthorQuery: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = (_source, { authorId }, _context, _info): BookItem[] => {
  const { booksModel } = _context;
  const books = booksModel.getBooksByAuthorId(authorId);
  return books;
};

export default getBooksByAuthorQuery;

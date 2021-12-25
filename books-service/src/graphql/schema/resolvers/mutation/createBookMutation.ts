import { GraphQLFieldResolver } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import { BookItem } from '@src/db/books-model';

const createBookMutation: GraphQLFieldResolver<unknown, IApolloServerContext> =
  (_source, { input: { title, authorId } }, _context, _info): BookItem => {
    const { booksModel } = _context;
    const book = booksModel.createBook(title, 'test', authorId);
    return book;
  };

export default createBookMutation;

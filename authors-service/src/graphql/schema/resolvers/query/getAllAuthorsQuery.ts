import { GraphQLFieldResolver } from 'graphql';
import { Author } from '@src/db/author-model';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

const getAllAuthorsQuery: GraphQLFieldResolver<unknown, IApolloServerContext> =
  (_source, _args, _context, _info): Author[] => {
    const { authorsModel } = _context;
    const authors = authorsModel.getAllAuthors();
    return authors;
  };

export default getAllAuthorsQuery;

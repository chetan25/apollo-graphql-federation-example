import { GraphQLFieldResolver } from 'graphql';
import { Author } from '@src/db/author-model';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

const createAuthorMutation: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = (_source, { input: { username } }, _context, _info): Author => {
  const { authorsModel } = _context;
  return authorsModel.createAuthor(username);
};

export default createAuthorMutation;

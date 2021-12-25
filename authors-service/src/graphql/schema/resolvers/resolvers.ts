import { GraphQLResolverMap } from 'apollo-graphql';
import { Author } from '@src/db/author-model';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import mutation from '@src/graphql/schema/resolvers/mutation/mutation';
import query from '@src/graphql/schema/resolvers/query/query';
import { models } from '@src/db';

interface IAuthorReference {
  __typename: 'Author';
  authorId: string;
}

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
  Author: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveReference: (ref: IAuthorReference): Author => {
      // eslint-disable-next-line radix
      console.log('ref', ref);
      return models.authors.getAuthorsById(ref.authorId);
    },
  },
};

export default resolvers;

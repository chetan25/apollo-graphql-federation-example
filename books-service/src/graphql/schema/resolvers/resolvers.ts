/* eslint-disable radix */
import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import mutation from '@src/graphql/schema/resolvers/mutation/mutation';
import query from '@src/graphql/schema/resolvers/query/query';
import { Author } from '@src/graphql/generated/graphql';
import { models } from '@src/db/index';
import { BookItem } from '@src/db/books-model';

interface IBookReference {
  __typename: 'Book';
  id: string;
  authorId: string;
}

interface IAuthorReference {
  __typename: 'Author';
  authorId: string;
}

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
  Book: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveReference: (book: IBookReference): BookItem => {
      return models.books.getBooksById(book.id);
    },
    author: async (book: IBookReference): Promise<Author> => {
      console.log('called', book.authorId);
      return { __typename: 'Author', authorId: book.authorId };
    },
  },
  Author: {
    books: (author: IAuthorReference): BookItem[] => {
      console.log(author, 'author');
      return models.books.getBooksByAuthorId(author.authorId);
    },
  },
};

export default resolvers;

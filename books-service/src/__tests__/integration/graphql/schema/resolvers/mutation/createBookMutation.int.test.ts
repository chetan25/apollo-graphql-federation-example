/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';
import { CreateBookInput } from '@src/graphql/generated/graphql';

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      __typename
      bookId
      title
      author
    }
  }
`;

describe('tests', () => {
  let server: ApolloServer;
  const typename = 'Book';

  beforeAll(() => {
    server = new ApolloServer(apolloServerConfig);
  });

  afterAll(async () => {});

  it('should pass', async () => {
    const mockBook: CreateBookInput = {
      title: 'dumb title',
      authorId: '212',
    };

    const result = await server.executeOperation({
      query: CREATE_BOOK_MUTATION,
      variables: { input: mockBook },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.createBook).toBeDefined();
    const createdBook = result?.data?.createBook;
    expect(createdBook.__typename).toBe(typename);
    expect(createdBook.bookId).toBeDefined();
    expect(createdBook.title).toBe(mockBook.title);
    expect(createdBook.authorId).toBe(mockBook.authorId);
  });
});

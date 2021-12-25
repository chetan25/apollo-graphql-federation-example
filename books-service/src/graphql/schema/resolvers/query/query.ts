import getAllBooksQuery from '@src/graphql/schema/resolvers/query/getAllBooksQuery';
import getBooksByAuthorQuery from '@src/graphql/schema/resolvers/query/getBooksByAuthorQuery';
import getBookById from '@src/graphql/schema/resolvers/query/getBookById';

const query = {
  books: {
    resolve: getAllBooksQuery,
  },
  booksByAuthor: {
    resolve: getBooksByAuthorQuery,
  },
  bookById: {
    resolve: getBookById,
  },
};

export default query;

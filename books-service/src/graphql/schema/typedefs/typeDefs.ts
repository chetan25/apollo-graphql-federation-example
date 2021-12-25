import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    # get all books
    books: [Book]

    bookById(bookId: Int): Book

    # get all books by author id
    booksByAuthor(authorId: Int): [Book]
  }

  extend type Mutation {
    # create book
    createBook(input: CreateBookInput!): Book!
  }

  type Book @key(fields: "id") {
    #  the book id
    id: ID!

    # the book title
    title: String

    # description
    description: String

    # the book author
    author: Author
  }

  extend type Author @key(fields: "authorId") {
    # the author id
    authorId: ID! @external

    # the authors list of books
    books: [Book]
  }

  input CreateBookInput {
    # the book title
    title: String

    # the author id
    authorId: String
  }
`;

export default typeDefs;

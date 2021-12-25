import { nanoid } from 'nanoid';
import { Low } from 'lowdb';

export type BookItem = {
  id: string;
  title: string;
  description: string;
  authorId: string;
};

export type BooksData = {
  books: BookItem[];
};

const createBooksModel = (db: Low<BooksData>) => {
  return {
    getAllBooks(): BookItem[] {
      // console.log(db.get('books').value());
      // console.log(db.getState());
      return db.get('books').value();
    },

    getBooksById(booksId: string): BookItem {
      return db.get('books').find({ id: booksId }).value();
    },

    getBooksByAuthorId(authorId: string): BookItem[] {
      console.log(
        'books',
        db
          .get('books')
          .value()
          .filter(book => book.authorId === authorId)
      );
      return db
        .get('books')
        .value()
        .filter(book => book.authorId === authorId);
    },

    createBook(title: string, description: string, authorId: string): BookItem {
      const newBook: BookItem = {
        id: nanoid(),
        title,
        description,
        authorId,
      };
      db.get('books').push(newBook).write();

      return newBook;
    },
  };
};

export default createBooksModel;

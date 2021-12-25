import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import createBooksModel, { BooksData } from './books-model';
// Use JSON file for storage
const adapter = new FileSync<BooksData>('./books.json');
const db: low<BooksData> = low<BooksData>(adapter);
// Set some defaults
db.defaults({
  books: [
    {
      id: '1212121',
      title: 'First Book',
      description: 'First Test book',
      authorId: '1',
    },
  ],
}).write();

console.log(db.getState());

export const models = {
  books: createBooksModel(db),
};

export const database = db;

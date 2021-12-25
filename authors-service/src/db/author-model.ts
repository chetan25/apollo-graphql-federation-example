import { nanoid } from 'nanoid';
import { Low } from 'lowdb';

export type Author = {
  authorId: string;
  username: string;
};

export type AuthorsData = {
  authors: Author[];
};

const createAuthorsModel = (db: Low<AuthorsData>) => {
  return {
    getAllAuthors(): Author[] {
      console.log(db.get('authors').value());
      console.log(db.getState());
      return db.get('authors').value();
    },

    getAuthorsById(authorId: string): Author {
      return db.get('authors').find({ authorId: authorId }).value();
    },

    createAuthor(username: string): Author {
      const newAuthor: Author = {
        authorId: nanoid(),
        username,
      };
      db.get('authors').push(newAuthor).write();

      return newAuthor;
    },
  };
};

export default createAuthorsModel;

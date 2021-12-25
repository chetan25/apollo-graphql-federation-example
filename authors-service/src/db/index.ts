import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import createAuthorsModel, { AuthorsData } from './author-model';
// Use JSON file for storage
const adapter = new FileSync<AuthorsData>('./author.json');
const db: low<AuthorsData> = low<AuthorsData>(adapter);
// Set some defaults
// Set some defaults
db.defaults({ authors: [] }).write();

db.get('authors')
  .push({
    authorId: '1',
    username: 'Test User',
  })
  .write();

console.log(db.getState());

export const models = {
  authors: createAuthorsModel(db),
};

export const database = db;

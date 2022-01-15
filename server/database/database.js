import MongoDB from 'mongodb';
import config from '../config.js';

let db;

export default async function connectDB() {
  return MongoDB.MongoClient.connect(config.db.host).then(client => {
    db = client.db();
  });
}

export function getUsersCollection() {
  return db.collection('users');
}

export function getTweetsCollection() {
  return db.collection('tweets');
}

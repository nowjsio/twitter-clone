import MongoDB from 'mongodb';
import config from '../config.js';

export default async function connectDB() {
  return MongoDB.MongoClient.connect(config.db.host).then(client =>
    client.db(),
  );
}

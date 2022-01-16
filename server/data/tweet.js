import MongoDB from 'mongodb';
import {
  getTweetsCollection,
  getUsersCollection,
} from '../database/database.js';
import * as userRepository from './auth.js';

export async function getAll() {
  // await deleteAllDocument();
  return getTweetsCollection()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}
export async function getAllByUsername(username) {
  return getTweetsCollection()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}
export async function getById(id) {
  return getTweetsCollection()
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalTweet);
}
export async function create(text, userId) {
  const { name, username, url, email } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date().toString(),
    userId,
    name,
    username,
    url,
    email,
  };
  return getTweetsCollection()
    .insertOne(tweet)
    .then(data => {
      return mapOptionalTweet({ ...tweet, _id: data.insertedId });
    });
}
export async function update(id, text) {
  return getTweetsCollection()
    .findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' },
    )
    .then(result => result.value)
    .then(mapOptionalTweet);
}
export async function remove(id) {
  return getTweetsCollection().deleteOne({ _id: new MongoDB.ObjectId(id) });
}
function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}

// export async function deleteAllDocument() {
//   const query = { text: { $regex: /.*/ } };
//   return getTweetsCollection()
//     .deleteMany(query)
//     .then(data => {
//       console.log('[!]deleted all tweets document');
//       console.log(data);
//       return data;
//     });
// }

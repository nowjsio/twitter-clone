import * as userRepository from './auth.js';

const tweetSchema = {
  id: 'string',
  text: 'string',
  createdAt: new Date(),
  name: 'string',
  username: 'string',
  url: 'optionalString',
};
let tweets = [
  {
    id: '1',
    text: 'hello 1 by.jw',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: 'hello 2 by.jw',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '3',
    text: 'hello 1 by.bob',
    createdAt: new Date().toString(),
    userId: '2',
  },
  {
    id: '4',
    text: 'hello 2 by.bob',
    createdAt: new Date().toString(),
    userId: '2',
  },
];
export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}
export async function getAllByUsername(userName) {
  return getAll().then((tweetList) =>
    tweetList.filter((tweet) => tweet.username === userName)
  );
}
export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
  // export async function getById
}
export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date().toString(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}
export async function update(id, text) {
  const tweet = tweets.find((tweetData) => tweetData.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}
export async function remove(id) {
  return tweets.find((tweet, index) => {
    if (tweet.id === id) {
      tweets.splice(index, 1);
      return true;
    }
    return false;
  });
}
// NOTE: export function ... 이렇게 하던가, export { getAll, getAllByUsername } 이렇게 하던가..
// export {
//   getAll,
//   getAllByUsername,
//   getById,
//   pushTweet,
//   create,
//   update,
//   remove,
// };

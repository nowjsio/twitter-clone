const tweetSchema = {
  id: 'string',
  text: 'string',
  createdAt: new Date(),
  name: 'string',
  username: 'string',
  url: 'optionalString',
};
const tweets = [
  //   {
  //     id: "1",
  //     text: "hello 1",
  //     createdAt: new Date(),
  //     name: "Jw",
  //     username: "jw",
  //     url: "https://www.jw.com",
  //   },
  {
    id: '1',
    text: 'hello 1',
    createdAt: new Date(),
    name: 'Jw',
    username: 'jw',
  },
  {
    id: '2',
    text: 'hello 2',
    createdAt: new Date(),
    name: 'Bob',
    username: 'bob',
  },
  {
    id: '3',
    text: 'hello 3',
    createdAt: new Date(),
    name: 'Tester',
    username: 'tester',
  },
  {
    id: '4',
    text: 'hello 4',
    createdAt: new Date(),
    name: 'Jw',
    username: 'jw',
  },
];
export async function getAll() {
  return tweets;
}
export async function getAllByUsername(userName) {
  // export async function getAllTweetsByUserName
  return tweets.filter((tweet) => tweet.username === userName);
}
export async function getById(id) {
  // export async function getById
  return tweets.find((tweet) => tweet.id === id);
}
export async function create(text, name, username, url) {
  const tweet = {
    id: String(parseInt(tweets[Object.keys(tweets).length - 1].id, 10) + 1),
    text,
    createdAt: new Date(),
    name,
    username,
    url: url || null,
  };
  // NOTE: tweets 을 let 으로 바꾸는건 위험하다. 그러나 여기서는 그렇게함. let tweets = ...; tweets = [tweet, ...tweets];
  tweets.push(tweet);
  return tweet;
}
export async function update(id, text) {
  const tweet = getById(id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
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

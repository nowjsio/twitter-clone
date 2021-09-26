import express from "express";

const router = express.Router();
const tweets = [
  {
    id: "1",
    text: "hello 1",
    createdAt: new Date(),
    name: "Jw",
    username: "jw",
    url: "https://www.jw.com",
  },
  {
    id: "2",
    text: "hello 2",
    createdAt: new Date(),
    name: "Bob",
    username: "bob",
    url: "https://www.Bob.com",
  },
  {
    id: "3",
    text: "hello 3",
    createdAt: new Date(),
    name: "Tester",
    username: "tester",
    url: "https://www.Tester.com",
  },
  {
    id: "4",
    text: "hello 4",
    createdAt: new Date(),
    name: "Jw",
    username: "jw",
    url: "https://www.Jw.com",
  },
];
const tweetSchema = {
  id: "string",
  text: "string",
  createdAt: new Date(),
  name: "string",
  username: "string",
  url: "optionalString",
};
function getUserTweets(username) {
  console.log("[!] called getUserTweets");
  const userTweetList = [];
  tweets.forEach((value, index) => {
    if (value.username === username) {
      userTweetList.push(value);
    }
  });
  console.log(userTweetList);
  return userTweetList;
}

function getIdTweets(id) {
  console.log("[!] called getIdTweets");
  const tweet = tweets.find((value, index) => value.id === id);
  if (tweet) {
    return tweet;
  } else {
    return {};
  }
}

function parseReqbody(body) {
  if (body.text && body.name && body.username) {
    const parsedReqBody = {};
    parsedReqBody.id = getUniqueId();
    parsedReqBody.text = body.text;
    parsedReqBody.createdAt = new Date();
    parsedReqBody.name = body.name;
    parsedReqBody.username = body.username;
    if (body.url) parsedReqBody.url = body.url;
    return parsedReqBody;
  } else {
    return false;
  }
}
function parseReqText(body) {
  if (body.text) {
    return body.text;
  } else {
    return false;
  }
}
function getUniqueId() {
  return new String(tweets.length + 1);
}
function updateTweet(id, newTweetText) {
  for (let item of tweets) {
    if (item.id === id) {
      item.text = newTweetText;
      item.createdAt = new Date();
      return item;
    }
  }
}
function createTweetes(newTweet) {
  tweets.push(newTweet);
  return;
}
function deleteTweet(id) {
  for (let item in tweets) {
    if (twwets[item.id] === id) {
    }
  }
}

router.get("/", (req, res, next) => {
  const userName = req.query.username;
  console.log(req.params);
  const data = !!userName
    ? tweets.filter((tweet) => tweet.username === userName)
    : tweets;
  res.status(200).json(data);
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  // const data = !!id ? tweets.find((tweet) => tweet.id === id) : null;
  const data = tweets.find((tweet) => tweet.id === id);
  // NOTE: find 해서 전부 false 이면 return 'undefined', filter 해서 전부 false 이면 return []
  if (data) {
    res.status(200).json(data);
    return;
  } else {
    res.status(400).json({ message: `Not Found inserted ID (${id})` });
  }
});
router.post("/", (req, res, next) => {
  const newTweets = parseReqbody(req.body);
  if (newTweets) {
    createTweetes(newTweets);
    res.status(201).json(newTweets);
  } else {
    res
      .stastus(404)
      .send(
        "dismatched type on your data, [name, username, text] must be used"
      );
  }
});
router.put("/:id", (req, res, next) => {
  const updatedText = parseReqText(req.body);
  if (updatedText) {
    const updatedTweet = updateTweet(req.params.id, updatedText);
    res.status(200).json(updatedTweet);
  } else {
    res.stastus(404).send("dismatched type on your data, [text] must be used");
  }
});
router.delete("/:id", (req, res, next) => {
  if (deleteTweet(req.params.id)) {
    res.status(204);
  } else {
    res.status(404).send(`not exists your id [${req.params.id}]`);
  }
});

export default router;

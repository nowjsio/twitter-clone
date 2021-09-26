import * as tweetRepository from "../data/tweet.js";

export async function getRoot(req, res, next) {
  const userName = req.query.username;
  //NOTE: query 에 userName 은 있지만 해당하는 userName 은 등록되지 않은 것 일 수 있다.
  const data = await (!!userName
    ? tweetRepository.getAllByUsername(userName)
    : tweetRepository.getAll());
  res.status(200).send(data);
}
// NOTE: Promise then 사용한 것
// export async function getId(req, res, next) {
//   const id = req.params.id;
//   tweetRepository
//     .getById(id) //
//     .then((data) => {
//       if (!!data) {
//         res.status(200).send(data);
//       } else {
//         res.sendStatus(404);
//       }
//     });
export async function getId(req, res, next) {
  const id = req.params.id;
  const data = await tweetRepository.getById(id);
  // NOTE: id 에 id 는 있지만 해당하는 id 은 등록되지 않은 것 일 수 있다.
  if (!!data) {
    res.status(200).send(data);
  } else {
    res.sendStatus(404);
  }
}
export async function postRoot(req, res, next) {
  const { text, name, username, url } = req.body;
  if (!!text && !!name && !!username) {
    const data = await tweetRepository.create(text, name, username, url);
    res.status(201).json(data);
  } else {
    res.status(404).json({ message: "your data is out of format" });
  }
}
export async function putId(req, res, next) {
  console.log("other router put");
  const id = req.params.id;
  const { text } = req.body;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
    return;
  } else {
    res.sendStatus(404);
  }
}
export async function deleteId(req, res, next) {
  const id = req.params.id;
  const tweets = await tweetRepository.getAll();
  const deletedTweet = await tweetRepository.remove(id);
  if (deletedTweet) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}
// export { getRoot, getId, postRoot, putId, deleteId };

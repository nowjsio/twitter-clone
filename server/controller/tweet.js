import * as tweetRepository from '../data/tweet.js';

export async function getRoot(req, res, next) {
  const userName = req.query.username;
  // NOTE: query 에 userName 은 있지만 해당하는 userName 은 등록되지 않은 것 일 수 있다.
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
  const { id } = req.params;
  const data = await tweetRepository.getById(id);
  // NOTE: id 에 id 는 있지만 해당하는 id 은 등록되지 않은 것 일 수 있다.
  if (!!data) {
    res.status(200).send(data);
  } else {
    res.sendStatus(404);
  }
}
export async function postRoot(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}
export async function putId(req, res, next) {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    // NOTE: 401: 로그인이 필요한 서비스인데, 로그인이 안되어있을 때
    // NOTE: 403: 로그인 된 사용자지만 권한이 없을 때
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}
export async function deleteId(req, res, next) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(400);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(id);
  return res.sendStatus(204);
}
// export { getRoot, getId, postRoot, putId, deleteId };

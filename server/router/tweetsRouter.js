import express from 'express';
import * as tweetController from '../controller/tweet.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /tweets
 * success: 200, json
 * failed: 404,
 */
router.get('/', isAuth, tweetController.getRoot);

router.get('/:id', isAuth, tweetController.getId);

router.post('/', isAuth, tweetController.postRoot);

// NOTE: AS-IS 잘못된 코드.. 이렇게 하면, tweet 이 업데이트 되지 않는다.
// router.put(
//   "/:id",
//   (req, res, next) => {
//     console.log("first put");
//     // NOTE: next() -> router 안에 cb 로 넘김. , next('route') -> 다른 router로 넘김, next('router') 해당 라우터에서 나가고, 다른 put 라우터로 안넘김. 바로 나가버림
//     // NOTE: next() 이후에 return 또는 response 를 안넘기면 다시 next 를 호출했던 부분으로 넘어오게 된다. 꼭 return  또는 response 를 넘겨야함.
//     // NOTE: next(new Error('TestErrorException')) 처럼 사용 가능
//     next();
//     return;
//     console.log("after first next() called");
//   },
//   (req, res, next) => {
//     console.log("second put");
//     next();
//     return;
//     console.log("after second next() called");
//   }
// );
// NOTE: TO-BE 잘 된 코드.. 이렇게 하면 tweet  이 자동으로 업데이트 된다.
router.put('/:id', isAuth, tweetController.putId);
router.delete('/:id', isAuth, tweetController.deleteId);

export default router;

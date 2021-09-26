import express from 'express';
import * as tweetController from '../controller/tweet.js';
import * as validator from '../middleware/validator.js';

const router = express.Router();

router.get('/', validator.getRoot, tweetController.getRoot);

router.get('/:id', validator.getId, tweetController.getId);

router.post('/', validator.postRoot, tweetController.postRoot);

router.put('/:id', validator.putId, tweetController.putId);

router.delete('/:id', validator.deleteId, tweetController.deleteId);

export default router;

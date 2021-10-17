import express from 'express';

import * as authController from '../controller/auth.js';
import * as authValidator from '../validation/authValidator.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

router.get('/me', isAuth, authController.getMe);
router.post('/login', authValidator.postLogin, authController.postLogin);
router.post('/signup', authValidator.postSignup, authController.postSignup);

export default router;

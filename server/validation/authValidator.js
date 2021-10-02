import { body, param, query, validationResult } from 'express-validator';

const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // NOTE: 400: 잘못된 요청에 대한 응답코드
  return res.status(400).json({
    // message: errors.array(),
    message: errors.array().map((val) => val.msg),
  });
};

export const getMe = [];

export const postLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is missing')
    .isLength({ min: 2 })
    .withMessage('username should be at least 4 charcters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is missing')
    .isLength({ min: 4 })
    .withMessage('password should be at least 4 characters'),
  validate,
];

export const postSignup = [
  ...postLogin,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
];

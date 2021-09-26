import { body, param, query, validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // NOTE: 404: Not-Found, 400: Bad-Request
  return res.status(400).json({ message: errors.array() });
};

export const getRoot = [
  query('username')
    .optional()
    .isLength({ min: 1 })
    .withMessage('[query] "username" should be at leaset 1 char'),
  validate,
];

export const getId = [
  param('id')
    .isLength({ min: 1 })
    .withMessage('[param] "id" should be at least 2 cahr')
    .isInt()
    .withMessage('[param] "id" should be type int '),
  validate,
];

export const postRoot = [
  body('text')
    .trim()
    .isLength({ min: 1 })
    .withMessage('[body] "text" should be at least 1 char')
    .isString()
    .withMessage('[body] "text" should be string type'),
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('[body] "name" should be at least 1 char')
    .isString()
    .withMessage('[body] "name" should be string type'),
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('[body] "username" should be at least 1 char')
    .isString()
    .withMessage('[body] "username" should be string type'),
  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('[body] "url" should be URL format'),
  validate,
];
export const putId = [
  param('id')
    .isLength({ min: 1 })
    .withMessage('[param] "id" should be at least 2 cahr')
    .isInt()
    .withMessage('[param] "id" should be type int '),
  body('text')
    .trim()
    .isLength({ min: 1 })
    .withMessage('[body] "text" should be at least 1 char')
    .isString()
    .withMessage('[body] "text" should be string type'),
  validate,
];
export const deleteId = [
  param('id')
    .isLength({ min: 1 })
    .withMessage('[param] "id" should be at least 2 cahr')
    .isInt()
    .withMessage('[param] "id" should be type int'),
  validate,
];

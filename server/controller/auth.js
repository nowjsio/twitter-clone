import jwt from 'jsonwebtoken';
import config from '../config.js';

import * as userRepository from '../data/auth.js';
import { comparePwd } from '../service/password.js';

async function createJwt(id) {
  const token = jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
  return token;
}
export async function getMe(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ token: req.token, username: user.username });
}
export async function postLogin(req, res, next) {
  // NOTE: validations, sanitization {username, password}
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (user) {
    const result = await comparePwd(password, user.bcryptedPassword);
    if (result) {
      const token = await createJwt(user.id);
      return res.status(200).json({ token, username });
    }
  }
  return res.status(401).json({ message: `Invalid username or password` });
}
export async function postSignup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const user = await userRepository.findByUsername(username);
  if (user) {
    // NOTE: 409: 이미 데이터가 존재할 때 발생 시킬 수 있는 응답코드
    return res.status(409).json({ message: `${username} already exists` });
  }
  const data = await userRepository.create(
    username,
    password,
    name,
    email,
    url,
  );
  if (data) {
    const token = await createJwt(data.id);
    return res.status(200).json({ token, username });
  }
  return (
    res
      // NOTE: 401: 권한에 문제가 있을 때 응답할 수 있는 코드
      .status(401)
      .json({ message: `not matched your input from authRepo` })
  );
}

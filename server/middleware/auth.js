import jwt from 'jsonwebtoken';
import * as authRepository from '../data/auth.js';

const jwtSecretKey = 'KwYBHLj&sCpzFkDmYPw1eH$vNnWRepgD';
const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, jwtSecretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};
export default isAuth;

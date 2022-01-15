import bcrypt from 'bcrypt';
import config from '../config.js';

export async function createBcryptPwd(pwd) {
  const bcryptedPwd = await bcrypt.hash(pwd, config.bcrypt.saltRounds);
  return bcryptedPwd;
}

export async function comparePwd(pwd, bcryptedPwd) {
  const result = await bcrypt.compare(pwd, bcryptedPwd);
  return result;
}

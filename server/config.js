import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefiend`);
  }
  return value;
}

// NOTE: https://www.lastpass.com/features/password-generator
const config = {
  jwt: {
    secretKey: required(`JWT_SECRET`),
    expiresInSec: parseInt(required(`JWT_EXPIRES_SEC`, 86400), 10),
  },
  bcrypt: {
    saltRounds: parseInt(required(`BCRYPT_SALT_ROUNDS`, 12), 10),
  },
  host: {
    port: parseInt(required(`HOST_PROT`, 3004), 10),
  },
};
export default config;

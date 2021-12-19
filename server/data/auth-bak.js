import bcrypt from 'bcrypt';
import config from '../config.js';
import { db } from '../db/database.js';

const tweetUsers = [
  {
    id: '1',
    username: 'jw',
    password: '$2b$10$81ff831xKTnJCZPY2Ouz9.NjkLJi4kTGkzPGm640RiYGJG.W4.VWi',
    name: 'Jw',
    email: 'jw@gmail.com',
    url: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
  },
  {
    id: '2',
    username: 'bob',
    password: '$2b$10$8/GI5YGw.2XzhQVxNUORfueL4atXtrc5xnE6D54IyIxDpLVmCIxai',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://cdn.pixabay.com/photo/2018/01/04/08/04/people-3060107_1280.jpg',
  },
];
async function createBcryptPwd(pwd) {
  const bcryptedPwd = await bcrypt.hash(pwd, config.bcrypt.saltRounds);
  return bcryptedPwd;
}

export async function comparePwd(pwd, bcryptedPwd) {
  const result = await bcrypt.compare(pwd, bcryptedPwd);
  return result;
}

export async function getAll() {
  return tweetUsers;
}
export async function findByUsername(username) {
  // NOTE: WHERE절 안에서는 괄호를 필히 사용하는게 좋다.
  return db
    .execute(`SELECT * FROM users WHERE (username=?)`, [username])
    .then(result => {
      console.log(result[0][0]);
      return result[0][0];
    });
}
export async function findById(userId) {
  return db
    .execute(`SELECT * FROM users WHERE (userId=?)`, [userId])
    .then(result => result[0][0]);
}

export async function create(user) {
  // NOTE: execute 는 모든 query 문 실행 가능한 반면, query 는 select 문만 가능하다. 따라서 execute 사용
  const { username, password, name, email, url } = user;
  return db
    .execute(
      `INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)`,
      [username, password, name, email, url],
    )
    .then(result => {
      return result[0].insertId;
    });
}

import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON (tw.userId = us.id)';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then(result => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE (us.username = ?) ${ORDER_DESC}`, [username])
    .then(result => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE (tw.id = ?) ${ORDER_DESC}`, [id])
    .then(result => result[0][0]);
}

export async function create(text, userId) {
  return (
    db
      .execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)', [
        text,
        new Date(),
        userId,
      ])
      // TODO: await 넣어서 확인해볼것.
      .then(result => getById(result[0].insertId))
  );
}

// export async function create(text, userId) {
//   return (
//     db
//       .execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)', [
//         text,
//         new Date(),
//         userId,
//       ])
//       // TODO: await 넣어서 확인해볼것. --> 되긴 된다.
//       .then(async result => await getById(result[0].insertId))
//   );
// }

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE (id=?)', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE (id = ?)', [id]);
}

import MongoDB from 'mongodb';
import { getUsersCollection } from '../database/database.js';
import { createBcryptPwd } from '../service/password.js';

// export async function deleteAllDocument() {
//   const query = { name: { $regex: /.*/ } };
//   return getUsersCollection()
//     .deleteMany(query)
//     .then(data => {
//       console.log('[!]deleted!!');
//       console.log(data);
//       return data;
//     });
// }

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
export async function findByUsername(username) {
  return getUsersCollection().findOne({ username }).then(mapOptionalUser);
}
export async function findById(userId) {
  return getUsersCollection()
    .findOne({ _id: new MongoDB.ObjectId(userId) })
    .then(mapOptionalUser);
}

export async function create(username, password, name, email, url) {
  const bcryptedPassword = await createBcryptPwd(password);
  const user = {
    username,
    bcryptedPassword,
    name,
    email,
    url: url || null,
  };
  return getUsersCollection()
    .insertOne(user)
    .then(data => {
      return data.insertedId.toString();
    });
}

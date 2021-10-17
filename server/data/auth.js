import bcrypt from 'bcrypt';

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
  const bcryptedPwd = await bcrypt.hash(pwd, 10);
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
  const users = await getAll();
  return users.find((user) => user.username === username);
}
export async function findById(userId) {
  const users = await getAll();
  return users.find((user) => user.id === userId);
}

export async function create(username, password, name, email, url) {
  const users = await getAll();
  const bcryptedPassword = await createBcryptPwd(password);
  const user = {
    // id: String(parseInt(users[Object.keys(users).length - 1].id, 10) + 1),
    id: new Date().getTime(),
    username,
    bcryptedPassword,
    name,
    email,
    url: url || null,
  };
  // NOTE: tweets 을 let 으로 바꾸는건 위험하다. 그러나 여기서는 그렇게함. let tweets = ...; tweets = [tweet, ...tweets];
  users.push(user);
  return user;
}

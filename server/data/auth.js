import SQ from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../db/database.js';

const { DataTypes } = SQ;
// NOTE: 'user' 로 만들었지만, table 에는 users 로 자동으로 s 붙어져서 생성된다.
export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true, // NOTE: default: true
    },
  },
  { timestamps: false },
);

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  // return User.findOne({ where: { id } });
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then(data => {
    // console.log(data);
    return data.dataValues.id;
  });
  // const { username, password, name, email, url } = user;
  // return db
  //   .execute(
  //     'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
  //     [username, password, name, email, url],
  //   )
  //   .then(result => result[0]);
}

export async function comparePwd(insertedPassword) {
  const result = bcrypt.compare(insertedPassword).then(console.log);
}

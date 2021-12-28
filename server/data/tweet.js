import SQ from 'sequelize';
import sequelize from '../db/database.js';
import { User } from './auth.js';

const { Sequelize } = SQ;
const { DataTypes } = SQ;
export const Tweet = sequelize.define(
  'tweet',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false },
);
// NOTE: 다음과 같이 belongsTo(TargeModel) 하게되면 foreignKey 생성된다.
Tweet.belongsTo(User);

// const SELECT_JOIN =
//   'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON (tw.userId = us.id)';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};
export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC }).then(data => {
    // console.log(data);
    return data;
  });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: { ...INCLUDE_USER.include, where: { username } },
  }).then(data => {
    console.log(data);
    return data;
  });
}

export async function getById(id) {
  return Tweet.findOne({ ...INCLUDE_USER, where: { id } });
}

export async function create(text, userId) {
  return Tweet.create({ text, userId, createdAt: new Date() }).then(
    async data => {
      const tweet = await getById(data.dataValues.id);
      return tweet;
    },
  );
}
export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER).then(tweet => {
    // eslint-disable-next-line no-param-reassign
    tweet.text = text;
    // eslint-disable-next-line no-param-reassign
    tweet.createdAt = new Date();
    return tweet.save();
  });
}

export async function remove(id) {
  return Tweet.findByPk(id).then(tweet => {
    tweet.destroy();
  });
}

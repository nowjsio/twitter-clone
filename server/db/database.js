import SQ from 'sequelize';
import config from '../config.js';

const { host, user, password, database } = config.db;
const sequelize = new SQ.Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
  logging: false,
});

export default sequelize;

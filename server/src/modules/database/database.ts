import { Sequelize } from 'sequelize';
import { connection } from './connection';
import logger from '@config/logger';

const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
  host: connection.host,
  dialect: 'mysql',
  pool: {
    max: connection.max,
    min: connection.min,
    idle: connection.idle,
  },
  logging: process.env.NODE_ENV !== 'production' ? (msg) => logger.debug(msg) : false,
});

export default sequelize;

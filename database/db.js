import Sequelize from 'sequelize';
import config from '../config.js';

export const connection = new Sequelize(
  config.db.database, 
  config.db.user, 
  config.db.password, 
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);
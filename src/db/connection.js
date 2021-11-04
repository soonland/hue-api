// const dbConfig = require('../startup/mysql.config');
const { Pool } = require('pg');

const dbConfig = require('./config');

const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
};

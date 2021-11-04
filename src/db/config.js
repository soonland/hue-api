const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'rpg_maker';
const password = process.env.DB_PASS || 'rpg_maker';
const database = process.env.DB_DATABASE || 'rpg_maker';
const port = process.env.DB_PORT || 5432;

module.exports = {
  host,
  user,
  password,
  database,
  port,
};

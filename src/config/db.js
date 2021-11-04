module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || 3306,
  USER: process.env.DB_USER || 'shop_user',
  PASSWORD: process.env.DB_PWD || 'gdpshop0!',
  DB: process.env.DB || 'shop_api',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

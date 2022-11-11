require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "java",
    database: "fake_store_test",
    host: 'localhost',
    dialect: "postgres",
  },
};

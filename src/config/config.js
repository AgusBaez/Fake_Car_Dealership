require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "java",
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: "postgres",
  },
};

// sequelize // instancia de la biblioteca Sequelize
const Sequelize = require("sequelize");
require("dotenv").config();
// Conexion y exportacion de la DB // Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    //Creo una nueva instancia Sequelize llamada sequelize
    //Parametros del nuevo Objeto Sequelize
    host: process.env.HOST, //Lugar donde esta la BDD
    dialect: process.env.DIALECT, //Dialecto de la BDD a utilizar
  }
);

module.exports = sequelize
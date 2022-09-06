// sequelize // instancia de la biblioteca Sequelize
<<<<<<< HEAD
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
=======
import Sequelize from "sequelize";

// Conexion y exportacion de la DB // Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
  procces.env.DATABASE_NAME,
  procces.env.DATABASE_USER,
  procces.env.DATABASE_PASSWORD,
  {
    //Creo una nueva instancia Sequelize llamada sequelize
    //Parametros del nuevo Objeto Sequelize
    host: procces.env.HOST, //Lugar donde esta la BDD
    dialect: procces.env.DIALECT, //Dialecto de la BDD a utilizar
  }
);
>>>>>>> f0c0a6bdd30e9cfa1378de6a90c2388e2cafab2f

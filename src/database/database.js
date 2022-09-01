// sequelize // instancia de la biblioteca Sequelize
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

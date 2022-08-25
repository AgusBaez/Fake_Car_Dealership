//Objeto con los tipos de datos que soporta sequelize
import { DataTypes } from "sequelize";
//requiero una instancia del objeto sequelize que tiene la conexion a la DB
import { sequelize } from "../database/database.js";

//documentacion https://sequelize.org/docs/v6/core-concepts/model-basics/

//Exquema de las tablas para products// es necesaria la exportacion para la creacion a travez de una variable que lo almacene y esta se va a crear cada que iniciemos el servidor si no exite la tabla
export const Category = sequelize.define(
  "categories",
  {
    /*
    nombre de la tabla {
      constructor(Objeto donde se define los nombres de la tabla)
    */
    id: {
      //Tipo de dato que viene del objeto sequelize
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

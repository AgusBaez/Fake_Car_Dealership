//Objeto con los tipos de datos que soporta sequelize
import { DataTypes } from "sequelize";
//requiero una instancia del objeto sequelize que tiene la conexion a la DB
import { sequelize } from "../database/database.js";
//importo el modelo que va a estar realcionado
import { Category } from "./Category.js";

//documentacion https://sequelize.org/docs/v6/core-concepts/model-basics/

//Exquema de las tablas para products// es necesaria la exportacion para la creacion a travez de una variable que lo almacene y esta se va a crear cada que iniciemos el servidor si no exite la tabla
export const Product = sequelize.define("products", {
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
  price: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
});

//Generar Relaciones(hasMany nos dice que tiene realcion con otro objeto del Modelo(muchos productos pertenecen a categoria))
Product.hasMany(Category, {
  //Objeto que crea y especifica como se crearan las relaciones
  foreignKey: "productId",
  //Opciones, donde se va a enlazar el fonreignKey en este esquema(Product)
  sourceKey: "id",
});

//La categoria tambien pertenece(esta asociada/ tiene una relacion) a:
Category.belongsTo(Product, {
  foreignKey: "productId",
  //Opciones, donde se va a enlazar el fonreignKey en este esquema(Product)
  targetId: "id", //tabla que se enlaza con la tabla PADRE
});

//Levanta la App
const app = require("./app.js");
//Llamo a la instacia de BDD
const sequelize = require("./database/database.js");

//Funcion para probar la conexion a la Base de Datos
async function main() {
  try {
    // await sequelize.authenticate(); //Metodo de autentificacion e intento de conexion.
    await sequelize.sync({ force: false }); //Metodo para la syncronizacion con la Base de Datos y la creacion de tablas si no existe // La opcion de force

    const port = 8080;
    app.listen(port);
    console.log(`Server is listening on port: http://localhost:${port}`);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

main();

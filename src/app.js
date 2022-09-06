//config express
const express = require("express");
//importo rutas
//const productsRouter = require("./routes/products.routes.js");
//const categoriesRouter = require("./routes/categories.routes.js");
const usersRouter = require("./routes/users.routes.js");
//Importo middlewares
const dateToDay = require("./middleware/dates.js");
//funcionalidades Express
const app = express();
//middleware
//const notFound = require("./middleware/errorHandler");

//Middleware & Router
app.use(express.json()); //middleware de express.json(): el servidor interpreta todo tipo de dato JSON para guardarlo: estos json viene en los endpoints req
app.use(dateToDay, usersRouter /*productsRouter, categoriesRouter*/);

//Add middleware NotFound

module.exports = app;

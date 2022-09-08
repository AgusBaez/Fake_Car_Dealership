const { auth, requiresAuth } = require("express-openid-connect");
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
const { errorLogger, errorParser } = require("./middleware/errorHandler");

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8080",
  clientID: "HnvEIz7H8dr8uI3PXqNkCQZZCqOdWTiv",
  issuerBaseURL: "https://dev-7d5esz5p.us.auth0.com",
  secret: "KJoEqwFwgf-JtvC7OFl49nkpF_o6_9t8bwls-ycsA0mNLyXG07Lwpn0jtfd_Nu_K",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//Middleware & Router

app.use(express.json()); //middleware de express.json(): el servidor interpreta todo tipo de dato JSON para guardarlo: estos json viene en los endpoints req
app.use(dateToDay, usersRouter /*productsRouter, categoriesRouter*/);
//Si se encuentra un error:
app.use([errorLogger, errorParser]);

module.exports = app;

//env
require("dotenv").config();
//config express
const express = require("express");
//importo rutas
const sesionRouter = require("./routes/sesion.routes.js");
const usersRouter = require("./routes/users.routes.js");
const carsRouter = require("./routes/cars.routes.js");
//funcionalidades Express
const app = express();
//middleware
const dateToDay = require("./middleware/dates.js");
const {
  errorLogger,
  errorParser,
  notFound,
} = require("./middleware/errorHandler");

//Middleware & Router
app.use(express.json()); //middleware de express.json(): el servidor interpreta todo tipo de dato JSON para guardarlo: estos json viene en los endpoints req

app.use(dateToDay, sesionRouter, carsRouter, usersRouter);
//Si se encuentra un error:
app.use([notFound, errorLogger, errorParser]);

module.exports = app;

// # Auth0 #
//const { auth, requiresAuth } = require("express-openid-connect");
// # Auth0 #
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: "http://localhost:8080",
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: "https://dev-7d5esz5p.us.auth0.com",
//   secret: process.env.SECRET_AUTH,
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

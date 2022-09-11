//env
require("dotenv").config();
// JWT
const jwt = require("jsonwebtoken");
// # Auth0 #
//const { auth, requiresAuth } = require("express-openid-connect");
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

const verification = express.Router();

//middleware de verificacion del token
//Auth Token
verification.use((req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    res.status(401).send("!Unauthorized¡");
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
    console.log(token);
  }
  if (token) {
    jwt.verify(token, app.get("key"), (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: "invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

app.get("/info", verification, (req, res) => {
  res.status(200).send("RESPONSE VERIFICATION CHECK");
});

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

//Middleware & Router
app.use(express.json()); //middleware de express.json(): el servidor interpreta todo tipo de dato JSON para guardarlo: estos json viene en los endpoints req

// JWT
app.set("key", process.env.KEY_JWT);
app.post("/login", (req, res) => {
  // if (verificar que el user y la pass en la DB sean iguales a lo que llega por req.body) {} else {'Unauthorized'}
  if (req.body.user == "admin" && req.body.password == 123) {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      //opciones de jwt sesions
      expiresIn: "7d", //expiracion
    });
    res.status(201).send({ token: token });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.use(dateToDay, usersRouter /*productsRouter, categoriesRouter*/);
//Si se encuentra un error:
app.use([errorLogger, errorParser]);

module.exports = app;

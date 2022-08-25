//config express
import express from "express";
//importo rutas
import productsRouter from "./routes/products.routes.js";

//funcionalidades Express
const app = express();

//middlewares
app.use(express.json()); //middleware de express: el servidor interpreta todo tipo de dato JSON para guardarlo: estos json viene en req.body

//router
app.use(productsRouter);

export default app;

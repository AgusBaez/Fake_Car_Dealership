//requiero la funcionalidades de router
const Router = require("express");
const router = Router();
//controller
const sesionController = require("../controller/sesion.controller.js");
//middleware
const errorHanddler = require("../middleware/errorHandler");

//registro de usuarios
router.post("/login", sesionController.login);
router.post("/register", sesionController.register);

module.exports = router;

//requiero la funcionalidades de router
const Router = require("express");
const router = Router();
//requiero importar el controlador de usuarios
const usersController = require("../controller/users.controller.js");
//middleware
const errorHanddler = require("../middleware/errorHandler");

router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);
//Se generea un error si no encuentra rutas
router.use(errorHanddler.notFound);

module.exports = router;

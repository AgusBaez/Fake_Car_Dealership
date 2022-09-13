//requiero la funcionalidades de router
const Router = require("express");
const router = Router();
//requiero importar el controlador de usuarios
const usersController = require("../controller/users.controller.js");
//middleware
const errorHanddler = require("../middleware/errorHandler");

router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);
router.get("/users/:id", usersController.getUsersById);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);
//Se generea un error si no encuentra rutas
router.use(errorHanddler.notFound);

module.exports = router;

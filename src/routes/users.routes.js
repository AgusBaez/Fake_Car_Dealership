//requiero la funcionalidades de router
const Router = require("express");
const router = Router();
//requiero importar el controlador de usuarios
const usersController = require("../controller/users.controller.js");
//middleware
const { checkAdmin, checkLoggedUser } = require("../middleware/authJWT");
const { checkLoggedIn } = require("../helper/checkUser");

router.get("/users", checkLoggedIn, usersController.getUsers);
router.post("/users", checkAdmin, usersController.addUser);
router.put("/editme", checkLoggedUser, usersController.editUserLogged);
router.get("/users/:id", checkLoggedIn, usersController.getUserById);
router.put("/users/:id", checkAdmin, usersController.updateUser);
router.delete("/users/:id", checkAdmin, usersController.deleteUser);
//Se generea un error si no encuentra rutas

module.exports = router;

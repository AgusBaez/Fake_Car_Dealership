//requiero la funcionalidades de router
const Router = require("express");
const router = Router();
//requiero importar el controlador de usuarios
const usersController = require("../controller/users.controller.js");

router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);

module.exports = router;

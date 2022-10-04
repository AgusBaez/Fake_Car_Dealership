const Router = require("express");
const router = Router();

const carsController = require("../controller/cars.controller.js");
//middleware
const { checkAdmin, checkLoggedUser } = require("../middleware/authJWT");
//helper
const { checkLoggedIn } = require("../helper/checkUser");

router.get("/cars", checkLoggedIn, carsController.getCars);
router.post("/cars", checkAdmin, carsController.addCar);
router.get("/cars/brand", carsController.getBrand);
//Comprar //Vender //Editar Auto
router.put("/cars/edit", checkLoggedUser, carsController.editCarLogged);

router.get("/cars/:id", checkLoggedIn, carsController.getCarsById);
router.put("/cars/:id", checkAdmin, carsController.updateCar);
router.delete("/cars/:id", checkAdmin, carsController.deleteCar);

module.exports = router;

const Router = require("express");
const router = Router();

const carsController = require("../controller/cars.controller.js");
//middleware
const { checkAdmin } = require("../middleware/authJWT");
//helper
const { checkLoggedIn } = require("../helper/checkUser");

router.get("/cars", checkLoggedIn, carsController.getCars);
router.post("/cars", checkAdmin, carsController.addCar);
//Comprar
//Vender
router.get("/cars/:id", checkLoggedIn, carsController.getCarsById);
router.put("/cars/:id", checkAdmin, carsController.updateCar);
router.delete("/cars/:id", checkAdmin, carsController.deleteCar);

module.exports = router;

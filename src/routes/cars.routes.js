const Router = require("express");
const router = Router();

const carsController = require("../controller/cars.controller.js");

router.get("/cars", carsController.getCars);
router.post("/cars", carsController.addCar);
router.get("/cars/:id", carsController.getCarsById);
router.put("/cars/:id", carsController.updateCar);
router.delete("/cars/:id", carsController.deleteCar);

module.exports = router;

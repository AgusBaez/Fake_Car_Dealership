//requiero la funcionalidades de router
import { Router } from "express";
const router = Router();
//requiero importar el controlador de usuarios
import productsController from "../controller/products.controller.js";

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductId);
router.post("/products", productsController.newProduct);
router.delete("/products/:id", productsController.deleteProduct);
router.put("/products/:id", productsController.updateProduct);

export default router;

import Router from "express";
//requiero importar el controlador de usuarios
import categoriesController from "../controller/categories.controller.js";

const router = Router();

router.get("/category", categoriesController.getCategories);
router.post("/category", categoriesController.addCategory);
router.get("/category/:id", categoriesController.getCategoryById);
router.put("/category/:id", categoriesController.updateCategory);
router.delete("/category/:id", categoriesController.deleteCategory);

//De la categoria por id traeme los productos relacionados
router.get("/category/:id/products", categoriesController.getCategoryProducts);

export default router;
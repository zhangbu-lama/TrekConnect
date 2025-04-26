import express from "express";
import {
    getAllCategories,
    getCategorieById,
    addCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/index.js";
import { upload } from "../middlewares/index.js";

export const categoriesRouter = express.Router();

categoriesRouter.get("/all", getAllCategories);
categoriesRouter.get("/:id", getCategorieById);
categoriesRouter.post("/add", upload.single("category_image"), addCategory);
categoriesRouter.patch("/update/:id", updateCategory);
categoriesRouter.delete("/delete/:id", deleteCategory);

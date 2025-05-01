import express from "express";
import { signup, userLogin } from "../controllers/index.js";
import { adminLogin } from "../controllers/admin/login.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", userLogin);
authRouter.post("/admin/login", adminLogin);

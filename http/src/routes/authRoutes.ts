import { Router } from "express";
import { meController, signInController, signUpController } from "../controllers/authControllers.js";
import { middleware } from "../middleware/middleware.js";

export const authRouter = Router();

authRouter.post("/signup", signUpController);
authRouter.post("/login", signInController);
authRouter.post("/me", middleware, meController);
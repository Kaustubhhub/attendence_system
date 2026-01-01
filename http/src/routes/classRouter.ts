import { Router } from "express";
import { teacherMiddleware } from "../middleware/middleware.js";
import { createClass } from "../controllers/classControllers.js";

export const classRouter = Router();

classRouter.get("/", teacherMiddleware, createClass)
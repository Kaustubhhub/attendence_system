import type { NextFunction, Request, Response } from "express";
import { compareJwtToken } from "../utils/jwt/index.js";

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    const user = await compareJwtToken(token);
    req.body.email = user.email;
    next()
}

export const studentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    const user = await compareJwtToken(token);
    if (user.role != 'student') {
        throw new Error("Unauthorised endpoint")
    }
    req.body.email = user.email;
    next();
}

export const teacherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    const user = await compareJwtToken(token);
    if (user.role != 'teacher') {
        throw new Error("Unauthorised endpoint")
    }
    req.body.email = user.email;
    next();
}
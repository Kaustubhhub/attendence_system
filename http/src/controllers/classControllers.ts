import type { Request, Response } from "express";
import { getDB } from "../db/mongoClient.js";

export const createClass = async (req: Request, res: Response) => {
    const email = req.body.email;
    const db = getDB();
    const users = db.collection('users');
    const teacher = await users.findOne({ "email": email });
}
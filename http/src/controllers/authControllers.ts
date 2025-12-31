import type { Request, Response } from "express";
import { signinType, signupType } from "../types/authTypes.js";
import { getDB } from "../db/mongoClient.js";
import type { User } from "../models/user.js";
import { compareHash, hashPassword } from "../utils/bcrypt/index.js";
import { compareJwtToken, generateJwtToken } from "../utils/jwt/index.js";

export const signUpController = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const parsedData = signupType.safeParse(body);
        if (!parsedData.success) {
            return res.json({
                "success": false,
                "data": "invalid data"
            })
        }
        const db = getDB();
        const users = db.collection<User>("users")
        const existingUser = await users.findOne({ email: parsedData.data.email });
        if (existingUser) {
            return res.json({
                "success": false,
                "error": "Email already exists"
            })
        }

        parsedData.data.password = await hashPassword(parsedData.data.password)
        const user = await users.insertOne(parsedData.data);
        const saveduser = {
            "name": parsedData.data.name,
            "email": parsedData.data.email,
            "role": parsedData.data.role,
            "_id": user.insertedId
        }
        res.json({
            "success": true,
            "data": {
                ...saveduser
            }
        })
    } catch (error) {

    }

}

export const signInController = async (req: Request, res: Response) => {
    const body = req.body;
    const parsedData = signinType.safeParse(body);
    if (!parsedData.success) {
        return res.json({
            "success": false,
            "data": "invalid data"
        })
    }
    const db = getDB();
    const users = db.collection("users");
    const user = await users.findOne({
        "email": parsedData.data.email
    })
    if (!user) {
        return res.json({
            "success": false,
            "error": "Invalid email or password"
        })
    }
    const isPasswordMatched = await compareHash(parsedData.data.password, user.password);
    if (!isPasswordMatched) {
        return res.json({
            "success": false,
            "error": "Invalid email or password"
        })
    }
    const data = {
        "email": user.email,
        "role": user.role
    }

    const token = await generateJwtToken(data);

    res.json({
        "success": true,
        "data": {
            "token": token
        }
    })
}

export const meController = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;

        const user = await compareJwtToken(token);

        const db = getDB();
        const users = db.collection("users");

        const existingUser = await users.findOne({ email: user.email });
        let dataToSend = {
            "_id": existingUser?._id,
            "name": existingUser?.name,
            "email": existingUser?.email,
            "role": user?.role
        }
        return res.json({
            success: true,
            data: dataToSend
        });

    } catch (error) {
        return res.json({
            success: false,
            error: "Invalid token"
        });
    }
}

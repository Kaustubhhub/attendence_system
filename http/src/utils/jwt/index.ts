import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import type { JwtPayload } from "jsonwebtoken";
dotenv.config()

interface loginType {
    email: string,
    role: userRole
}

enum userRole {
    "student",
    "teacher"
}

interface MyJwtPayload extends JwtPayload {
    email: string;
    role: string;
}


const JWTSECRET = process.env.JWT_SECRET;

export const generateJwtToken = async (data: loginType) => {
    if (!JWTSECRET) {
        throw new Error("JWT secret not loaded")
    }
    const token = jwt.sign(data, JWTSECRET)
    // console.log(token)
    return token;
}

// export const compareJwtToken = async (token: string) => {
//     if (!JWTSECRET) {
//         throw new Error("JWT secret not loaded")
//     }

//     try {
//         const decoded = jwt.verify(token, JWTSECRET);
//         return decoded;
//     } catch (error) {
//         throw new Error("Invalid or expired token");
//     }
// }

export const compareJwtToken = async (token: string): Promise<MyJwtPayload> => {
    if (!JWTSECRET) {
        throw new Error("JWT secret not loaded");
    }

    const decoded = jwt.verify(token, JWTSECRET);

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }

    return decoded as MyJwtPayload;
};

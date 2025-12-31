import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()

const HASH = Number(process.env.HASH);

export const hashPassword = async (password: string) => {
    if (!HASH) {
        throw new Error("failed to hash password");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, HASH)
        return hashedPassword;
    } catch (err) {
        console.error("hashing failed :", err);
        throw new Error("hashing failed");
    }
}

export const compareHash = async (password: string, hashedPassword: string) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        console.error("Compare failed:", err);
        return false;
    }
}
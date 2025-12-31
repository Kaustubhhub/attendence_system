import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
if (!url) throw new Error("MONGO_URL not found in .env");

let client: MongoClient;
let db: Db;

export const connectDB = async () => {
    if (db) return db;

    client = new MongoClient(url);
    await client.connect();

    console.log("MongoDB Connected");

    const dbName = url.split("/").pop()?.split("?")[0];
    if (!dbName) throw new Error("Database name missing in MONGO_URL");

    db = client.db(dbName);
    return db;
};

export const getDB = () => {
    if (!db) throw new Error("DB not connected. Call connectDB() first.");
    return db;
};

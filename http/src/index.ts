import express from "express"
import * as dotenv from "dotenv"
import { authRouter } from "./routes/authRoutes.js"
import { connectDB } from "./db/mongoClient.js"
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.get("/health", (req, res) => {
    res.json({
        "success": true,
        "data": "Server is healthy"
    })
})

app.use("/auth", authRouter);
app.use("/class")

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
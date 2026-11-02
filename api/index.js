import "dotenv/config";
import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection failed in Vercel handler:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(
            JSON.stringify({
                statusCode: 500,
                success: false,
                message: "Database connection failed",
            })
        );
    }

    return app(req, res);
}

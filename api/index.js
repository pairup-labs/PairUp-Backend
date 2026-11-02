import connectDB from "../src/db/index.js";
import { app } from "../src/app.js";

let isDbConnected = false;

export default async function handler(req, res) {
    if (!isDbConnected) {
        try {
            await connectDB();
            isDbConnected = true;
        } catch (err) {
            console.error("Database connection failed on serverless invocation:", err);
        }
    }
    return app(req, res);
}

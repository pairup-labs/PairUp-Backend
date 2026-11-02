import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    mongoose.set("debug", process.env.NODE_ENV !== "PRODUCTION");
    try {
        let mongoUri = process.env.URI || "";
        if (mongoUri && DB_NAME && !mongoUri.includes(`/${DB_NAME}`)) {
            if (mongoUri.includes("?")) {
                mongoUri = mongoUri.replace("?", `/${DB_NAME}?`);
            } else {
                mongoUri = `${mongoUri}/${DB_NAME}`;
            }
        }
        const connectionInstance = await mongoose.connect(mongoUri);
        console.log(
            `\nMongoDB is connected !! DB Host: ${connectionInstance.connection.host}`
        );
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection Error: ", error);
        if (process.env.NODE_ENV !== "PRODUCTION" && !process.env.VERCEL) {
            process.exit(1);
        }
        throw error;
    }
};

export default connectDB;

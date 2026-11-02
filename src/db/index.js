import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (process.env.NODE_ENV !== "PRODUCTION") {
        mongoose.set("debug", true);
    }

    try {
        const connectionInstance = await mongoose.connect(process.env.URI, {
            dbName: DB_NAME,
        });

        console.log(
            `\nMongoDB connected successfully !! DB Host: ${connectionInstance.connection.host}`
        );
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection Error: ", error);
        if (process.env.NODE_ENV !== "PRODUCTION") {
            process.exit(1);
        }
        throw error;
    }
};

export default connectDB;

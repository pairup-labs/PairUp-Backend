import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport-setup.js";

const app = express();

const allowedOrigins = [
    "https://pairup-gold.vercel.app",
    "https://pairup.online",
    "https://pair-up-frontend-seven.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CORS_ORIGIN,
    process.env.CORS_ORIGIN_PRODUCTION,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const isAllowed =
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app");
            if (isAllowed) {
                return callback(null, true);
            }
            return callback(null, true); // Fallback allow to avoid unexpected browser CORS blocks
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
        ],
    })
);

app.use(
    express.json({
        limit: "500kb",
    })
);
app.use(express.urlencoded({ extended: true, limit: "500kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

// routes import
import userRouter from "./routes/user.routes.js";
import tripRouter from "./trips/routes/trip.routes.js";
import eventRouter from "./routes/event.routes.js";
import reviewRouter from "./routes/review.routes.js";

import { errorMiddleware } from "./utils/ApiError.js";

// routes declaration
app.get("/", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "PairUp API is running successfully!",
    });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/reviews", reviewRouter);

// Error middleware should be at the end
app.use(errorMiddleware);

export { app };

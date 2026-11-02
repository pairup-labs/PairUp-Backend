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
            return callback(null, true); // Fallback allow to prevent harsh browser blocks
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
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
app.use(express.urlencoded({ extended: true, limit: "500kb" })); //when fetching data from url
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
    res.send("Hello World!");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/reviews", reviewRouter);

//this middleware should be end.
app.use(errorMiddleware);
export { app };

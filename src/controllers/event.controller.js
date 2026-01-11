import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Event } from "../models/event.model.js";
import { tripUploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// Create an Event
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location } = req.body;

    console.log(`
    title: ${title}
    description: ${description}
    startDate: ${date}
    location: ${location}
    `);

    // const event = await Event.create({
    //     title,
    //     description,
    //     date,
    //     location,
    // });
});

export { createEvent };

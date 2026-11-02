import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";

// Create an Event
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location } = req.body;

    const event = await Event.create({
        title,
        description,
        date,
        location,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, event, "Event created successfully"));
});

export { createEvent };

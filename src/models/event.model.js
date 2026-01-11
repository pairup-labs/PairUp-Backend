import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
                required: [true, "location is required"],
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model("Event", eventSchema);

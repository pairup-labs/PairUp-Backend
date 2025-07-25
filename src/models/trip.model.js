import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        categories: {
            type: [String],
            default: [],
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        numberOfPeople: {
            type: Number,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        itinerary: [
            {
                activity: String,
            },
        ],
        coverImage: {
            type: String, // cloudinary URL
        },
        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [], // Ensure it defaults to an empty array
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
    },
    { timestamps: true }
);

tripSchema.index({ location: "2dsphere" });

export const Trip = mongoose.model("Trip", tripSchema);

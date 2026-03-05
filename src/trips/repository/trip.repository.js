import { Trip } from "../models/trip.model.js";

export const createTrip = (data) => Trip.create(data);

export const findTripById = (tripId) => Trip.findById(tripId);

export const addParticipant = async (trip, userId) => {
  trip.participants.push(userId);
  return trip.save();
};
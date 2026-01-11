import {
    getAllTrip,
    getNearbyTrips,
    getUserTripHistory,
    joinTrip,
    postTrip,
    viewTripDetails,
} from "../controllers/trip.controller.js";

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// --- Base Route for Trips ---
// GET /api/v1/trips
// POST /api/v1/trips

router
    .route("/")
    .get(getAllTrip) // working fine
    .post(verifyJWT, upload.single("coverImage"), postTrip);

router.route("/nearby").get(getNearbyTrips); // working fine
// --- Routes for a Specific Trip by ID ---
// GET /api/v1/trips/:tripId
// PATCH /api/v1/trips/:tripId  (Example for future use)
// DELETE /api/v1/trips/:tripId (Example for future use)
router.route("/:tripId").get(viewTripDetails); // working fine
//  .patch(verifyJWT, updateTrip)  // You could add these later
//  .delete(verifyJWT, deleteTrip); // You could add these later

router.route("/:tripId/join").post(verifyJWT, joinTrip); // working fine

router.route("/trips-history/:userId").get(getUserTripHistory); // working fine

export default router;

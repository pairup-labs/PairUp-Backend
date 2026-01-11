import { createEvent } from "../controllers/event.controller.js";

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Post a trip (with image upload)
router
    .route("/post-event")
    .post(verifyJWT, upload.single("coverImage"), createEvent);

export default router;

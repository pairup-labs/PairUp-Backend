import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getTripHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    findUserByUsername,
    verifyEmail,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllReviews } from "../controllers/review.controller.js";

const router = Router();

// --- Base Route for Users ---
// POST /api/v1/users

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
    ]),
    registerUser
); // localhost:8001/api/v1/users working fine

router.route("/login").post(loginUser); // working fine
//secured routes
router.route("/logout").post(verifyJWT, logoutUser); // working fine
router.route("/verify-email/:token").get(verifyEmail); // working fine
router.route("/refresh-token").post(refreshAccessToken); // localhost:8001/api/v1/users/refresh-token working fine

// --- Logged-in User's Profile ("/me") ---
// GET    /api/v1/users/me
// PATCH  /api/v1/users/me
router
    .route("/me")
    .get(verifyJWT, getCurrentUser) // working fine
    .patch(verifyJWT, updateAccountDetails); // working fine

router.route("/me/change-password").patch(verifyJWT, changeCurrentPassword); // working fine

router
    .route("/me/avatar")
    .patch(verifyJWT, upload.single("avatar"), updateUserAvatar); // working fine

router.route("/:username").get(findUserByUsername); // working fine

router.route("/me/reviews").get(verifyJWT, getAllReviews); // working fine

router.route("/me/trips").get(verifyJWT, getTripHistory); // working fine

export default router;

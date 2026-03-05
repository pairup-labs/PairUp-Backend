import {
    createReview,
    getAllReviews,
    getRatings,
} from "../controllers/review.controller.js";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/user/:revieweeId")
    .post(verifyJWT, createReview) // create review/comment
    .get(getAllReviews); // get all reviews/comments
router.route("/user/:revieweeId/ratings").get(getRatings); // get all ratings/stars

export default router;

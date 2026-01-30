import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getReviewSummary } from "../controllers/reviewController.js";

import {
  getReviewsByMovie,
  addReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:movieId", getReviewsByMovie);      // 🔓 public
router.post("/:movieId", protect, addReview);   // 🔐 protected
router.get("/summary/:movieId", getReviewSummary);

export default router;

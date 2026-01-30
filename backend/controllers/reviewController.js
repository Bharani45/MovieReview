import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "../models/Review.js";
import axios from "axios";
import { summarizeReviews } from "../services/llmService.js";

dotenv.config();

import Movie from "../models/Movie.js";

export const getReviewSummary = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movie: movieId });

    if (!reviews || reviews.length === 0) {
      return res.json({ summary: "No reviews yet." });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ summary: "Movie not found." });
    }

    const reviewTexts = reviews.map((r) => r.comment).join("\n");

    const userGenre = req.user?.favoriteGenre || "Unknown";
    const movieGenre = movie.genre;

    // ⭐ Send genres to LLM
    const summary = await summarizeReviews(
      reviewTexts,
      userGenre,
      movieGenre
    );

    res.json({ summary });

  } catch (error) {
    console.error("Summary Controller Error:", error);
    res.status(500).json({ summary: "Could not generate summary at this time." });
  }
};


// 🔓 Public – Get reviews for a movie
export const getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const reviews = await Review.find({ movie: movieId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 Protected – Add review
export const addReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, comment } = req.body;

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      movie: movieId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this movie" });
    }

    const review = await Review.create({
      movie: movieId,
      user: req.user._id,
      userName: req.user.name,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

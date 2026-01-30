import Movie from "../models/Movie.js";
import mongoose from "mongoose";
// GET all movies (search + filter)
export const getMovies = async (req, res) => {
  try {
    const { search, genre } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (genre && genre !== "All") {
      query.genre = genre;
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single movie
export const getMovieById = async (req, res) => {
  const { id } = req.params;

  // ✅ Validate ObjectId first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST add movie
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

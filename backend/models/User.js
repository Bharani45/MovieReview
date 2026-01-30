import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
favoriteGenre: {
      type: String,
      required: true,
      enum: ["Action", "Drama", "Sci-Fi", "Comedy", "Romance"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

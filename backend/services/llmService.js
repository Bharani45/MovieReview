import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile", // best balance
  temperature: 0.7,
  maxTokens: 150,
});

export async function summarizeReviews(reviewsText, userGenre, movieGenre) {
  try {
    userGenre = userGenre || "Unknown";
    movieGenre = movieGenre || "Unknown";

    const prompt = `
User favorite genre: ${userGenre}
Movie genre: ${movieGenre}

User reviews:
${reviewsText}

Task:
1. Say whether the movie matches the user's favorite genre.
2. Explain how someone who likes ${userGenre} would feel about this ${movieGenre} movie.
3. Mention pros and cons from the reviews.
4. Keep the response concise (2–3 sentences).
`;

    const response = await llm.invoke(prompt);
    return response.content?.trim() || "No summary generated.";
  } catch (err) {
    console.error("Groq Error:", err);
    return "Summary unavailable at the moment.";
  }
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ReviewForm from "../components/ReviewForm";

const MovieDetails = ({ user }) => { // receive user from App.js
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    // Fetch movie data
    API.get(`/movies/${id}`).then(res => setMovie(res.data));

    // Fetch reviews
    API.get(`/reviews/${id}`).then(res => setReviews(res.data));

    // Fetch AI summary
    API.get(`/reviews/summary/${id}`)
      .then(res => setAiSummary(res.data.summary))
      .catch(err => setAiSummary("AI summary not available."));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 20px" }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      {aiSummary && (
        <div style={{ background: "#f0f8ff", padding: "15px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          <h3>AI Summary</h3>
          <p>{aiSummary}</p>
        </div>
      )}

{reviews.map(r => (
  <div
    key={r._id}
    style={{
      background: "#fff",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
    }}
  >
    <strong>{r.userName}</strong> 

    {/* Render stars dynamically */}
    <span style={{ marginLeft: "10px", color: "#ffcc00" }}>
      {Array.from({ length: r.rating }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
    </span>

    <p>{r.comment}</p>
  </div>
))}


      {/* Pass the user prop here */}
      <ReviewForm movieId={id} setReviews={setReviews} user={user} />
    </div>
  );
};

export default MovieDetails;

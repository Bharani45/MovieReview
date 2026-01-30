import { useState } from "react";
import API from "../services/api";

const ReviewForm = ({ movieId, setReviews, user }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a review.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/reviews/${movieId}`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(prev => [res.data, ...prev]);
      setComment("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || "Could not post review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <textarea 
        value={comment} 
        onChange={e => setComment(e.target.value)} 
        placeholder="Write your review..." 
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <div style={{ marginBottom: "10px" }}>
        <label>Rating: </label>
        <select value={rating} onChange={e => setRating(e.target.value)} style={{ padding: "5px", borderRadius: "5px" }}>
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <button type="submit" style={{ padding: "8px 15px", borderRadius: "5px", background: "#1e1e2f", color: "#fff", border: "none", cursor: "pointer" }}>
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;

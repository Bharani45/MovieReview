import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px" }}>
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>⭐ {movie.rating}</p>
      <Link to={`/movie/${movie._id}`}>View Details</Link>
    </div>
  );
};

export default MovieCard;

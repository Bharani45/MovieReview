import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = genre === "All" || movie.genre === genre;
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Movies</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", gap: "10px", flexWrap: "wrap" }}>
        <SearchBar search={search} setSearch={setSearch} />
        <GenreFilter genre={genre} setGenre={setGenre} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {filteredMovies.length > 0 ? filteredMovies.map(movie => (
          <Link key={movie._id} to={`/movies/${movie._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {movie.poster && <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "300px", objectFit: "cover" }} />}
              <div style={{ padding: "10px" }}>
                <h3 style={{ marginBottom: "5px" }}>{movie.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>{movie.genre}</p>
              </div>
            </div>
          </Link>
        )) : <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No movies found.</p>}
      </div>
    </div>
  );
};

export default Dashboard;

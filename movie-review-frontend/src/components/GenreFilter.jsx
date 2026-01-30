const GenreFilter = ({ genre, setGenre }) => {
  return (
    <select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      style={{ padding: "10px" }}
    >
      <option value="All">All</option>
      <option value="Sci-Fi">Sci-Fi</option>
      <option value="Drama">Drama</option>
      <option value="Action">Action</option>
    </select>
  );
};

export default GenreFilter;

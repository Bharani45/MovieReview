const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search movie..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: "10px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
  );
};

export default SearchBar;

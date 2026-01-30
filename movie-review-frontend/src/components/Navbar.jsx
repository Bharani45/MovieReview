import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <nav
      style={{
        background: "#1e1e2f",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        MovieReview
      </Link>
      <div>
        <Link
          to="/"
          style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}
        >
          Home
        </Link>

        {user ? (
          <button
            onClick={logout}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              background: "#ff5555",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{ marginRight: "10px", color: "#fff", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

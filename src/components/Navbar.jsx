import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <nav className="bg-white shadow" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
     <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/">Home</Link>
      <Link to="/add-habit">Add Habit</Link>
      <Link to="/my-habits">My Habits</Link>
      <Link to="/public-habits">Browse Habits</Link>

      <div style={{ marginLeft: "auto" }}>
        {!user ? (
          <>
            <Link to="/login">Login</Link>{" "}
            <Link to="/register">Signup</Link>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <img
              src={user.photoURL}
              alt="user"
              onClick={() => setOpen(!open)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />

            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "200px",
                }}
              >
                <p>{user.displayName}</p>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
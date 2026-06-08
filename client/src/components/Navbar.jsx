import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("pendingEmail");

    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-purple-600">
        BookVerse
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>

        <Link to="/explore">
          Explore
        </Link>

        <Link to="/categories">
          Categories
        </Link>

        {user ? (
          <>
            <Link to="/dashboard">
              My Dashboard
            </Link>

            <Link to="/notifications">
              🔔
            </Link>

            <Link
              to={`/profile/${user._id}`}
            >
              👤 Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
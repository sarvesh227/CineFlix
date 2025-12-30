import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import AuthContext from "../context/AuthContext";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const isScrolled = useScroll();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background-dark/95 shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-red-600 text-2xl md:text-3xl font-bold font-mono tracking-widest cursor-pointer">
              CineFlix
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-6 text-white">
          {/* <ThemeToggle /> */}
          {user ? (
            <>
              <span className="text-gray-300">Hello, {user.username}</span>
              <Link to="/watchlist" className="hover:text-red-500 transition">Watchlist</Link>
              <Link to="/watched" className="hover:text-red-500 transition">History</Link>
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-500 transition">Login</Link>
              <Link to="/signup" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

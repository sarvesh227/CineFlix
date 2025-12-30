import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import useScroll from "../hooks/useScroll";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const isScrolled = useScroll();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? "bg-background-dark/95 shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-red-600 text-2xl md:text-3xl font-bold font-mono tracking-widest cursor-pointer">
              CineFlix
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white">
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

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-white z-50">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 text-white text-xl transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {user ? (
          <>
            <span className="text-gray-400 text-base mb-4">Hello, {user.username}</span>
            <Link to="/" onClick={closeMenu} className="hover:text-red-500">Home</Link>
            <Link to="/watchlist" onClick={closeMenu} className="hover:text-red-500">Watchlist</Link>
            <Link to="/watched" onClick={closeMenu} className="hover:text-red-500">History</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-8 py-3 rounded text-lg hover:bg-red-700 transition mt-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" onClick={closeMenu} className="hover:text-red-500">Home</Link>
            <Link to="/login" onClick={closeMenu} className="hover:text-red-500">Login</Link>
            <Link to="/signup" onClick={closeMenu} className="bg-red-600 px-8 py-3 rounded hover:bg-red-700 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

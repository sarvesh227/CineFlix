import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import backend from "../api/backend";
import { FaPlus, FaPlay, FaCheck, FaEye } from "react-icons/fa";

export default function MovieCard({ movie, onClick }) {
    const { user, watched, addToWatchedHistory, removeFromWatchedHistory } = useContext(AuthContext);

    const isWatched = watched.has(movie.imdbID);

    const handleToggleWatched = async (e) => {
        e.stopPropagation();
        if (!user) {
            alert("Please login to track watched movies");
            return;
        }

        let success = false;
        if (isWatched) {
            success = await removeFromWatchedHistory(movie.imdbID);
        } else {
            success = await addToWatchedHistory(movie);
        }

        if (!success) {
            alert("Failed to update watched status. Please try again.");
        }
    };

    const handleAddToWatchlist = async (e) => {
        e.stopPropagation(); // Prevent opening modal
        if (!user) {
            alert("Please login to add to watchlist");
            return;
        }
        try {
            await backend.post("/watchlist", {
                movieId: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year
            });
            alert("Added to watchlist!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add to watchlist");
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => onClick(movie)}
        >
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                alt={movie.Title}
                className="w-full h-[400px] object-cover"
            />

            {/* Watched Overlay Indicator (Always visible if watched) */}
            {isWatched && (
                <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-full shadow-lg z-20">
                    <FaCheck size={12} />
                </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 to-transparent rounded-md">
                <div className="flex gap-2 mb-2">
                    {/* Toggle Watched Button */}
                    <button
                        className={`p-2 rounded-full transition ${isWatched ? "bg-green-600 text-white" : "bg-white text-black hover:bg-gray-200"}`}
                        onClick={handleToggleWatched}
                        title={isWatched ? "Remove from Watched History" : "Mark as Watched"}
                    >
                        {isWatched ? <FaCheck size={10} /> : <FaEye size={10} />}
                    </button>

                    {/* Watchlist Button */}
                    <button
                        className="p-2 border-2 border-gray-400 rounded-full hover:border-white text-white hover:bg-white/20 transition"
                        onClick={handleAddToWatchlist}
                        title={user ? "Add to Watchlist" : "Login to add to Watchlist"}
                    >
                        <FaPlus size={10} />
                    </button>
                </div>
                <h3 className="text-white text-sm font-bold truncate">{movie.Title}</h3>
                <p className="text-green-400 text-xs font-semibold">98% Match</p>
                <div className="flex gap-2 text-[10px] text-gray-300">
                    <span>{movie.Year}</span>
                    <span className="border border-gray-500 px-1">HD</span>
                </div>
            </div>
        </motion.div >
    );
}

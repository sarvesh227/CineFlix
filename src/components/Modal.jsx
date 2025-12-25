import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import omdb from "../api/omdb";

export default function Modal({ movie, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (movie?.imdbID) {
            const fetchDetails = async () => {
                setLoading(true);
                setError(null);
                try {
                    const res = await omdb.get("/", {
                        params: { i: movie.imdbID, plot: 'full' }
                    });
                    if (res.data.Response === "True") {
                        setMovieDetails(res.data);
                    } else {
                        setError(res.data.Error || "Failed to load details");
                    }
                } catch (err) {
                    console.error("Failed to fetch movie details:", err);
                    setError("Network error. Please try again.");
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();
        } else {
            setMovieDetails(null);
        }
    }, [movie]);

    if (!movie) return null;

    // Use fetched details if available, otherwise fallback to basic search result data
    const displayMovie = movieDetails || movie;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    className="bg-[#181818] text-white rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-white/20 transition"
                    >
                        <AiOutlineClose size={24} />
                    </button>

                    <div className="grid md:grid-cols-[1fr_2fr]">
                        {/* Image Side */}
                        <div className="h-[400px] md:h-[500px]">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Available"}
                                alt={movie.Title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="p-8 flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                            <h2 className="text-4xl font-bold">{displayMovie.Title}</h2>

                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <span className="border border-gray-600 px-2 py-0.5 uppercase">HD</span>
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <FaStar /> {displayMovie.imdbRating || "N/A"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {displayMovie.Year}
                                </span>
                                <span>{displayMovie.Runtime || "N/A"}</span>
                            </div>

                            {loading ? (
                                <div className="animate-pulse space-y-4 py-4">
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                </div>
                            ) : error ? (
                                <div className="text-red-400 py-4">{error}</div>
                            ) : (
                                <>
                                    <p className="text-lg leading-relaxed text-gray-300">
                                        {displayMovie.Plot !== "N/A" ? displayMovie.Plot : "No plot available."}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-400">
                                        <p><span className="text-gray-200">Genre:</span> {displayMovie.Genre || "N/A"}</p>
                                        <p><span className="text-gray-200">Director:</span> {displayMovie.Director || "N/A"}</p>
                                        <p><span className="text-gray-200">Actors:</span> {displayMovie.Actors || "N/A"}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

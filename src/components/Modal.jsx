import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar, FaCalendarAlt } from "react-icons/fa";

export default function Modal({ movie, onClose }) {
    if (!movie) return null;

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
                            <h2 className="text-4xl font-bold">{movie.Title}</h2>

                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <span className="border border-gray-600 px-2 py-0.5 uppercase">HD</span>
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <FaStar /> {movie.imdbRating || "N/A"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {movie.Year}
                                </span>
                                <span>{movie.Runtime}</span>
                            </div>

                            <p className="text-lg leading-relaxed text-gray-300">
                                {movie.Plot}
                            </p>

                            <div className="mt-4 space-y-2 text-sm text-gray-400">
                                <p><span className="text-gray-200">Genre:</span> {movie.Genre}</p>
                                <p><span className="text-gray-200">Director:</span> {movie.Director}</p>
                                <p><span className="text-gray-200">Actors:</span> {movie.Actors}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

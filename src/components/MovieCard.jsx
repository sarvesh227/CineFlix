import { motion } from "framer-motion";
import { FaPlay, FaPlus } from "react-icons/fa";

export default function MovieCard({ movie, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative min-w-[160px] md:min-w-[200px] h-[300px] rounded-md cursor-pointer group"
            onClick={() => onClick(movie)}
            whileHover={{
                scale: 1.1,
                zIndex: 10,
                transition: { duration: 0.3 }
            }}
        >
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
                className="w-full h-full object-cover rounded-md group-hover:brightness-75 transition-all"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 to-transparent rounded-md">
                <div className="flex gap-2 mb-2">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition text-black">
                        <FaPlay size={10} />
                    </button>
                    <button className="p-2 border-2 border-gray-400 rounded-full hover:border-white text-white">
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
        </motion.div>
    );
}

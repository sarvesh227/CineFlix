import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

// Static high-res background (Cinematic abstract or collage)
const STATIC_BG = "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2031&auto=format&fit=crop";

export default function Hero({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={STATIC_BG}
                    alt="Cinema Background"
                    className="w-full h-full object-cover opacity-30 dark:opacity-20 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent" />
                <div className="absolute inset-0 bg-background-light/20 dark:bg-background-dark/40 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-3xl px-6 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white drop-shadow-2xl">
                    Search for your next favorite movie.
                </h1>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 font-medium">
                    Millions of movies, TV shows and people to discover. Explore now.
                </p>

                {/* Integrated Modern Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative group w-full max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-500 group-focus-within:text-red-500 transition-colors text-xl" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for movies..."
                        className="w-full pl-12 pr-6 py-4 md:py-5 text-lg bg-white/80 dark:bg-black/60 border-2 border-gray-300 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/20 backdrop-blur-md transition-all shadow-xl"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 rounded-full font-bold transition-all transform active:scale-95"
                    >
                        Search
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

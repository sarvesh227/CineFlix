import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const movieTitles = [
  // Nolan / Sci-Fi
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Batman Begins",
  "Tenet",

  // Marvel / Superhero
  "Iron Man",
  "Avengers Endgame",
  "Avengers Infinity War",
  "Captain America The Winter Soldier",
  "Spider-Man No Way Home",
  "Doctor Strange",
  "Black Panther",

  // Classics
  "Forrest Gump",
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather Part II",
  "Schindler's List",
  "Gladiator",
  "Braveheart",

  // Modern masterpieces
  "Joker",
  "Parasite",
  "Whiplash",
  "Django Unchained",
  "Fight Club",
  "The Wolf of Wall Street",
  "Gone Girl",

  // Sci-Fi / Fantasy
  "The Matrix",
  "Blade Runner 2049",
  "Arrival",
  "Dune",
  "Star Wars Rogue One",
  "The Lord of the Rings The Fellowship of the Ring",

  // Animation (adds visual variety)
  "The Lion King",
  "Toy Story",
  "Up",
  "Spider-Man Into the Spider-Verse",

  // Romance / Drama
  "Titanic",
  "La La Land",
  "The Fault in Our Stars",

  // Thriller / Crime
  "Se7en",
  "Prisoners",
  "The Silence of the Lambs",
  "No Country for Old Men",

  // Indian (nice global touch)
  "3 Idiots",
  "Dangal",
  "Andhadhun",
];


const fetchRandomPosters = async (count = 10) => {
    const shuffled = [...movieTitles].sort(() => Math.random() - 0.5).slice(0, count);

    const results = await Promise.all(
        shuffled.map(async (title) => {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${encodeURIComponent(title)}`
            );
            const data = await res.json();
            return data.Poster !== "N/A" ? data.Poster : null;
        })
    );

    return results.filter(Boolean);
};

const MovingRow = ({ posters, duration, direction = "left", className }) => {
    // Ensure we have enough posters to scroll smoothly
    const displayPosters = [...posters, ...posters, ...posters, ...posters];

    return (
        <div className={`flex gap-4 mb-4 ${className} overflow-hidden whitespace-nowrap`}>
            <motion.div
                initial={{ x: direction === "left" ? 0 : -1000 }}
                animate={{ x: direction === "left" ? -1000 : 0 }}
                transition={{
                    repeat: Infinity,
                    duration: duration,
                    ease: "linear",
                }}
                className="flex gap-4"
            >
                {displayPosters.map((src, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[150px] h-[225px] rounded-lg overflow-hidden opacity-30 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <img src={src} alt="Poster" className="w-full h-full object-cover" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function AuthBackground({ children }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        Promise.all([
            fetchRandomPosters(8),
            fetchRandomPosters(8),
            fetchRandomPosters(8),
        ]).then(setRows);
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 flex flex-col justify-center select-none pointer-events-none">
                {rows.length > 0 && (
                    <>
                        <MovingRow posters={rows[0]} duration={40} />
                        <MovingRow posters={rows[1]} duration={50} direction="right" className="ml-[-100px]" />
                        <MovingRow posters={rows[2]} duration={45} />
                    </>
                )}
            </div>

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black/90 z-10" />

            {/* Content (Form) */}
            <div className="relative z-20 w-full max-w-md px-4">
                {children}
            </div>
        </div>
    );
}

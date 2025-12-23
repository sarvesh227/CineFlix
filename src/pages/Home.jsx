import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import omdb from "../api/omdb";
import MovieCard from "../components/MovieCard";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Tracks if a search has been initiated
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const res = await omdb.get("/", {
        params: { s: query },
      });
      if (res.data.Response === "True") {
        setSearchResults(res.data.Search);
      } else {
        setError(res.data.Error || "No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-10 transition-colors duration-300">
      <Navbar />

      {/* Search Area */}
      <Hero onSearch={handleSearch} />

      {/* Results Area */}
      <div className="px-4 md:px-12 min-h-[400px]">
        {/* State: Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* State: Error / No Results */}
        {!isLoading && error && (
          <div className="text-center mt-20">
            <h3 className="text-2xl text-gray-400 font-semibold">{error}</h3>
          </div>
        )}

        {/* State: Results Grid */}
        {!isLoading && !error && searchResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Results for <span className="text-red-600">"{searchQuery}"</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {searchResults.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
              ))}
            </div>
          </div>
        )}

        {/* State: Initial (No search yet) */}
        {!isSearching && !isLoading && (
          <div className="text-center mt-20 opacity-50">
            <p className="text-gray-500 text-lg">Type a movie name above to start searching...</p>
          </div>
        )}
      </div>

      <Modal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

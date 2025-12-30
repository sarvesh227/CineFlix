import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import backend from '../api/backend';
import { FaTrash } from 'react-icons/fa';

import BackButton from '../components/BackButton';

const Watchlist = () => {
    const { user } = useContext(AuthContext);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const res = await backend.get('/watchlist');
                setWatchlist(res.data);
            } catch (err) {
                setError('Failed to load watchlist');
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, [user]);

    const removeMovie = async (movieId) => {
        try {
            await backend.delete(`/watchlist/${movieId}`);
            setWatchlist(watchlist.filter((movie) => movie.movieId !== movieId));
        } catch (err) {
            console.error('Failed to remove movie', err);
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

    if (!user) return <div className="text-white text-center mt-20">Please login to view your watchlist.</div>;

    return (
        <div className="bg-gray-900 min-h-screen pb-10">
            <Navbar />
            <div className="pt-24 px-4 md:px-12">
                <div className="flex items-center gap-4 mb-8">
                    <BackButton />
                    <h2 className="text-3xl font-bold text-white">My Watchlist</h2>
                </div>

                {watchlist.length === 0 ? (
                    <p className="text-gray-500">Your watchlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {watchlist.map((movie) => (
                            <div key={movie._id} className="relative group bg-gray-800 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <img
                                    src={movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                                    alt={movie.title}
                                    className="w-full h-[300px] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-white font-bold truncate">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm">{movie.year}</p>
                                </div>
                                <button
                                    onClick={() => removeMovie(movie.movieId)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove from Watchlist"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;

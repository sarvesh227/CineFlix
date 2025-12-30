import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import backend from '../api/backend';
import { FaTrash, FaCheck } from 'react-icons/fa';
import BackButton from '../components/BackButton';

const Watched = () => {
    const { user, removeFromWatchedHistory } = useContext(AuthContext);
    const [watchedList, setWatchedList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatched = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const res = await backend.get('/watched');
                setWatchedList(res.data);
            } catch (err) {
                console.error('Failed to load watched list');
            } finally {
                setLoading(false);
            }
        };

        fetchWatched();
    }, [user]);

    const handleRemove = async (movieId) => {
        await removeFromWatchedHistory(movieId);
        setWatchedList(watchedList.filter((movie) => movie.movieId !== movieId));
    };

    return (
        <div className="bg-gray-900 min-h-screen pb-10">
            <Navbar />
            <div className="pt-24 px-4 md:px-12">
                <div className="flex items-center gap-4 mb-8">
                    <BackButton />
                    <h2 className="text-3xl font-bold text-white">Watched History</h2>
                </div>

                {loading ? <div className="text-white">Loading...</div> : (
                    <>
                        {(!user) ? <div className="text-white">Please login to view history.</div> : (
                            watchedList.length === 0 ? (
                                <p className="text-gray-500">You haven't marked any movies as watched yet.</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {watchedList.map((movie) => (
                                        <div key={movie._id} className="relative group bg-gray-800 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                            <img
                                                src={movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                                                alt={movie.title}
                                                className="w-full h-[300px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                                            />
                                            <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-full shadow-lg z-20">
                                                <FaCheck size={12} />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-white font-bold truncate">{movie.title}</h3>
                                                <p className="text-gray-400 text-sm">{movie.year}</p>
                                                <p className="text-green-500 text-xs mt-1">Watched on {new Date(movie.watchedAt).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(movie.movieId)}
                                                className="absolute top-2 left-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
                                                title="Remove from History"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Watched;

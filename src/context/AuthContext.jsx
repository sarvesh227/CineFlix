import { createContext, useState, useEffect } from "react";
import backend from "../api/backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [watched, setWatched] = useState(new Set()); // Set of IMDb IDs

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // Fetch watched list when user changes
    useEffect(() => {
        if (user) {
            fetchWatched();
        } else {
            setWatched(new Set());
        }
    }, [user]);

    const fetchWatched = async () => {
        try {
            const res = await backend.get('/watched');
            const watchedIds = new Set(res.data.map(m => m.movieId));
            setWatched(watchedIds);
        } catch (error) {
            console.error("Failed to fetch watched list", error);
        }
    };

    const addToWatchedHistory = async (movie) => {
        try {
            await backend.post('/watched', {
                movieId: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year
            });
            // Update local state
            setWatched(prev => new Set(prev).add(movie.imdbID));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const removeFromWatchedHistory = async (movieId) => {
        try {
            await backend.delete(`/watched/${movieId}`);
            setWatched(prev => {
                const next = new Set(prev);
                next.delete(movieId);
                return next;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await backend.post("/auth/login", { email, password });
            if (response.data) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
            }
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await backend.post("/auth/register", {
                username,
                email,
                password,
            });
            if (response.data) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
            }
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setWatched(new Set());
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, watched, addToWatchedHistory, removeFromWatchedHistory }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

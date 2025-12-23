import { BsSun, BsMoon } from "react-icons/bs";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <BsSun className="text-white w-5 h-5" />
            ) : (
                <BsMoon className="text-gray-900 w-5 h-5" />
            )}
        </button>
    );
}

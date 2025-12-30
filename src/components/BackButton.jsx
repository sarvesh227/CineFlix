import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ className = "" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 text-white bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-full transition duration-200 ${className}`}
        >
            <FaArrowLeft />
            <span>Back</span>
        </button>
    );
};

export default BackButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ErrorElement = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="text-center">
                {/* Error Code */}
                <h1 className="text-9xl font-extrabold text-white drop-shadow-lg animate-bounce">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                    Oops! Page Not Found
                </h2>

                <p className="text-lg text-gray-200 mt-2">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ErrorElement;

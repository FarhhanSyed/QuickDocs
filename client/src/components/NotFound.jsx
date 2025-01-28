import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold mb-6">404 - Page Not Found</h2>
                <p className="text-gray-700 mb-6">
                    The page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
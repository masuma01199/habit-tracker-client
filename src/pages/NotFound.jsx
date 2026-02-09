import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;

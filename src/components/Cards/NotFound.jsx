import { useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-6">
      <AiOutlineExclamationCircle className="text-red-500 text-9xl mb-4" />

      <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>

      <p className="text-gray-600 text-lg mt-2">
        Sorry, the page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;

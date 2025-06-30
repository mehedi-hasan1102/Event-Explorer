
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | Error</title>
        <meta name="description" content="Oops! Page not found." />
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
        {/* 404 Image */}
        <img
          src="https://i.ibb.co/FkNbM6YT/3793096.jpg"
          alt="404 Not Found"
          className="w-full max-w-xs md:max-w-md mb-6"
          loading="lazy"
        />

        {/* <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1> */}
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found.</h2>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className=" mb-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;

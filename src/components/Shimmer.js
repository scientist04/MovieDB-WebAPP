import { IMAGE_URL } from "../utils/constants";

const Shimmer = () => {
  return (
    <div className="movie-card w-full sm:w-48 md:w-52 lg:w-60 xl:w-64 h-auto p-4 bg-gray-800 rounded-lg shadow-lg animate-pulse">
      <div className="text-center">
        <div className="rounded-lg w-full h-48 bg-gray-600 mb-2" />{" "}
        {/* Placeholder for poster image */}
        <div className="h-4 w-3/4 bg-gray-600 rounded mb-2 mx-auto" />{" "}
        {/* Placeholder for title */}
        <div className="h-4 w-1/2 bg-gray-600 rounded mx-auto" />{" "}
        {/* Placeholder for rating */}
      </div>
    </div>
  );
};

export default Shimmer;

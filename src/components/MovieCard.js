import { IMAGE_URL } from "../utils/constants";

const MovieCard = (props) => {
  const { movieData } = props;
  const { poster_path, title, vote_average } = movieData;

  return (
    <div className="movie-card w-full sm:w-48 md:w-52 lg:w-60 xl:w-64 h-auto p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      <div className="text-center">
        <img
          className="rounded-lg w-full h-auto object-cover"
          src={IMAGE_URL + poster_path}
          alt={title}
        />
        <h1 className="mt-2 text-sm sm:text-base lg:text-lg font-semibold text-white">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Rating: {vote_average}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

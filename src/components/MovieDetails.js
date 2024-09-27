import { useState, useEffect } from "react";
import { IMAGE_URL } from "../utils/constants";
import CastDetails from "./CastDetails";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetailsList, setMovieDetailsList] = useState([]);
  const [castDetailsList, setCastDetailsList] = useState([]);
  const [visibleCastCount, setVisibleCastCount] = useState(6); // Initial number of cast members to show

  const { movieId } = useParams();

  useEffect(() => {
    fetchData();
    fetchDataCast();
  }, [movieId]);

  const fetchData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    );
    const json = await data.json();
    setMovieDetailsList(json);
  };

  const fetchDataCast = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    );
    const json = await data.json();
    setCastDetailsList(json?.cast || []);
  };

  // if (!movieDetailsList.title) return <Shimmer />; // Updated loading condition

  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
    runtime,
  } = movieDetailsList;

  return (
    <div className="bg-slate-800">
      {/* Backdrop Image: Centered horizontally */}
      <div className="relative inline-flex place-items-start w-full">
        <img
          className="w-full md:w-11/12 h-auto md:h-[540px] mx-auto block mt-5 rounded-xl" // Centered and hidden on small screens
          src={IMAGE_URL + backdrop_path}
          alt={title}
        />
        <div className="absolute hidden md:block">
          {" "}
          {/* Hide on small screens */}
          <div className="flex">
            <div>
              <img
                className="w-40 h-56 ml-20 mt-9 rounded-lg"
                src={IMAGE_URL + poster_path}
                alt={title}
              />
            </div>
            <div className="mt-12 ml-3">
              <h1 className="text-3xl text-white font-bold mb-3">{title}</h1>
              <p className="text-2xl text-blue-700 font-semibold mb-6">
                Rating: {vote_average}
              </p>
              <p className="text-lg text-gray-400 font-bold mb-2">
                {runtime} mins{"  "}
                {movieDetailsList?.genres
                  ?.map((genre) => genre.name)
                  .join(", ")}
              </p>
              <p className="text-lg text-gray-400 font-bold mb-2">
                Release Date: {release_date}
              </p>
            </div>
          </div>
          <div>
            <h1 className="mt-8 ml-20 text-2xl font-semibold text-white mb-4">
              Overview
            </h1>
            {/* Dynamic width for overview text */}
            <p className="ml-20 font-bold text-gray-400 mb-4 w-1/2 md:w-1/3 lg:w-1/4">
              {overview}
            </p>
          </div>
        </div>
      </div>

      {/* Cast Section: Always visible */}
      <div className="ml-5 mt-5 font-semibold text-white mb-3 text-3xl">
        Cast
      </div>
      <div className="flex flex-wrap justify-center">
        {/* Show only cast details on small screens */}
        <div className="block sm:hidden">
          {castDetailsList.slice(0, visibleCastCount).map((cast) => (
            <CastDetails key={cast.id} castData={cast} />
          ))}
        </div>
      </div>

      {/* Movie details for larger screens */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap justify-center">
          {castDetailsList.slice(0, visibleCastCount).map((cast) => (
            <CastDetails key={cast.id} castData={cast} />
          ))}
        </div>
      </div>

      {visibleCastCount < castDetailsList.length && (
        <div className="flex justify-center mt-5">
          <div className="bg-slate-800 p-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
              onClick={() => setVisibleCastCount(visibleCastCount + 6)}
            >
              Load More...
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

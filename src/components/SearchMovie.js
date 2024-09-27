import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";

const SearchMovie = () => {
  const [movieSearchData, setMovieSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("query");

  useEffect(() => {
    if (movieName) {
      fetchData(movieName, currentPage);
    } else {
      setErrorMessage(
        "Please provide an appropriate movie name, then smash the search button!!"
      );
      setMovieSearchData([]); // Clear previous results if no input
    }
  }, [movieName, currentPage]);

  const fetchData = async (searchData, page) => {
    setLoading(true); // Set loading to true before fetching
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${encodeURIComponent(
        searchData
      )}&page=${page}`
    );

    const json = await data.json();
    setLoading(false); // Set loading to false after fetching

    if (json.results.length === 0) {
      setErrorMessage("Please provide appropriate text to search movie!!");
      setMovieSearchData([]); // Clear previous results
    } else {
      setErrorMessage(""); // Clear error message if data is found
    }
    setMovieSearchData(json?.results || []);
    setTotalPages(json?.total_pages || 0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`min-h-screen bg-slate-800 ${
        movieSearchData.length === 0 ? "overflow-hidden" : ""
      }`}
    >
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-500 text-white text-center py-3 animate-bounce duration-300 transform scale-105">
          {errorMessage}
        </div>
      )}

      {/* Movie Cards Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 py-10 items-stretch">
          {loading ? (
            // Render 20 shimmer cards while loading
            Array.from({ length: 20 }).map((_, index) => (
              <Shimmer key={index} />
            ))
          ) : movieSearchData.length === 0 ? (
            <div className="text-white text-center py-10 animate-pulse">
              <p className="text-2xl font-semibold">No movies found.</p>
              <p className="mt-2 text-lg">Please try a different search.</p>
            </div>
          ) : (
            movieSearchData.map((movie) => (
              <Link key={movie?.id} to={"/movie-details/" + movie?.id}>
                <MovieCard movieData={movie} />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      {movieSearchData.length > 0 && (
        <div className="bg-gray-900 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchMovie;

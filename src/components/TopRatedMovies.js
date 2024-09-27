import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const TopRatedMovies = () => {
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setLoading(true); // Set loading to true
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
    );
    const json = await data.json();
    setTopRatedMoviesList(json?.results || []);
    setTotalPages(json?.total_pages || 0);
    setLoading(false); // Set loading to false after fetching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Movie Cards Section with Background Color */}
      <div className="bg-slate-800 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 py-10 items-stretch">
            {loading
              ? // Render 20 shimmer cards while loading
                Array.from({ length: 20 }).map((_, index) => (
                  <Shimmer key={index} />
                ))
              : topRatedMoviesList.map((movie) => (
                  <Link key={movie?.id} to={"/movie-details/" + movie?.id}>
                    <MovieCard movieData={movie} />
                  </Link>
                ))}
          </div>
        </div>
      </div>

      {/* Pagination Section with Different Background Color */}
      <div className="bg-gray-900 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TopRatedMovies;

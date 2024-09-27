import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [movieName, setMovieName] = useState("");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-slate-600 to-slate-800 p-4">
      <div className="font-bold text-3xl mb-2 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 hover:scale-105 transition-transform duration-300 ease-in-out">
        <Link to="/">MovieDb</Link>
      </div>
      <div className="flex items-center w-full md:w-auto">
        <ul className="hidden md:flex md:mr-4">
          <li className="ml-4">
            <Link
              className="text-lg text-gray-200 transition-all duration-300 ease-in-out transform hover:text-slate-400 hover:scale-110"
              to="/"
            >
              Popular
            </Link>
          </li>
          <li className="ml-4">
            <Link
              className="text-lg text-gray-200 transition-all duration-300 ease-in-out transform hover:text-slate-400 hover:scale-110"
              to="top-rated-movies"
            >
              Top Rated
            </Link>
          </li>
          <li className="ml-4">
            <Link
              className="text-lg text-gray-200 transition-all duration-300 ease-in-out transform hover:text-slate-400 hover:scale-110"
              to="upcoming-movies"
            >
              Upcoming
            </Link>
          </li>
        </ul>
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          className="px-3 py-2 rounded-md mr-2 w-full md:w-40 text-gray-800"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <Link to={`/searched-movies?query=${encodeURIComponent(movieName)}`}>
          <button className="text-gray-100 border rounded-md bg-gradient-to-r from-slate-500 to-slate-600 px-4 py-2 hover:scale-105 transition-transform duration-300 ease-in-out">
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

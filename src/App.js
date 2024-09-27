import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import Error from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import SearchMovie from "./components/SearchMovie";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/top-rated-movies",
        element: <TopRatedMovies />,
      },
      {
        path: "/upcoming-movies",
        element: <UpcomingMovies />,
      },
      {
        path: "/movie-details/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/searched-movies",
        element: <SearchMovie />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

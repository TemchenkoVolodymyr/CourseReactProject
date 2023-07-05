import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../router/Layout';
import Home from '../../pages/Home';
import DiscoveryPage from '../../pages/MoviesListPages/DiscoveryPage';
import FreshMoviePage from '../../pages/MoviesListPages/FreshMoviePage';
import TrendingMovie from '../../pages/MoviesListPages/TrendingMovie';
import CurrentGenre from '../../pages/PopularGenders/CurrentGenre';
import AuthPage from '../../pages/AuthPage/AuthPage';
import NotfoundPage from '../../pages/NotFoundPage/NotfoundPage';
import MoviePage from '../../pages/MoviePage/MoviePage';
import PopularMoviesPage from '../../pages/MoviesListPages/PopularMoviesPage';
import ActorPage from '../../pages/ActorPage/ActorPage';
import UserProfile from '../../pages/UserProfilePage/UserProfile';
import UserWatchList from '../../Components/UserProfile/NavComponents/UserWatchList';
import UserRatings from '../../Components/UserProfile/NavComponents/UserRatings';
import UserFavorites from '../../Components/UserProfile/NavComponents/UserFavorites';
import UserProfileComponent from '../../Components/UserProfile/NavComponents/UserProfileComponent';
import UserReviews from "../../Components/UserProfile/NavComponents/UserReviews";

const RoutersCollection = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="discovery" element={<DiscoveryPage/>}/>
          <Route path="fresh" element={<FreshMoviePage/>}/>
          <Route path="trending" element={<TrendingMovie/>}/>
          <Route path="/genre/:genre" element={<CurrentGenre/>}/>
          <Route path="/login" element={<AuthPage/>}/>
          <Route path="/register" element={<AuthPage/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
          <Route path="/movie/:title" element={<MoviePage/>}/>
          <Route path="/person/:name" element={<ActorPage/>}/>
          <Route path="/popMovies" element={<PopularMoviesPage/>}/>
          <Route path="/favoriteMovies" element={<FreshMoviePage/>}/>
          <Route path="/u/:userName" element={<UserProfile/>}>
            <Route index element={<UserProfileComponent/>} />
            <Route path="/u/:userName/favorites" element={<UserFavorites/>}/>
            <Route path="/u/:userName/watchlist" element={<UserWatchList/>}/>
            <Route path="/u/:userName/ratings" element={<UserRatings/>}/>
            <Route path="/u/:userName/reviews" element={<UserReviews/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RoutersCollection;
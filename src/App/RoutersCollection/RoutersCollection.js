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
import AdminPanel from '../../Components/AdminPanel/AdminPanel';
import AdminPanelStatistics
  from '../../Components/AdminPanel/NavComponents/AdminPanelStatistics/AdminPanelStatistics';
import UsersAP from '../../Components/AdminPanel/NavComponents/AdminPanelUsers/UsersAP';
import MoviesAP from '../../Components/AdminPanel/NavComponents/AdminPanelMovies/MoviesAP';
import ActorsAP from '../../Components/AdminPanel/NavComponents/AdminPanelActors/ActorsAP';
import GenresAP from '../../Components/AdminPanel/NavComponents/AdminPanelGenres/GenresAP';
import ActorPage from '../../pages/ActorPage/ActorPage';

const RoutersCollection = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="discovery" element={<DiscoveryPage/>}/>
          <Route path="fresh" element={<FreshMoviePage/>}/>
          <Route path="trending" element={<TrendingMovie/>}/>
          <Route path="/genre/:genre" element={<CurrentGenre/>}/>
          <Route path="auth" element={<AuthPage/>}/>
          <Route path="*" element={<NotfoundPage/>}/>
          <Route path="/movie/:id" element={<MoviePage/>}/>
          <Route path="/person/:name" element={<ActorPage/>}/>
          <Route path="/popMovies" element={<PopularMoviesPage/>}/>
          <Route path="/favoriteMovies" element={<FreshMoviePage/>}/>
          <Route path="/adminPanel" element={<AdminPanel/>}>
            <Route path="static" element={<AdminPanelStatistics/>}/>
            <Route path="users" element={<UsersAP/>}/>
            <Route path="movies" element={<MoviesAP/>}/>
            <Route path="actors" element={<ActorsAP/>}/>
            <Route path="genres" element={<GenresAP/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default RoutersCollection;
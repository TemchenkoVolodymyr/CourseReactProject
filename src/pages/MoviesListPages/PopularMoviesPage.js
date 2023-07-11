import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from '../Pages.module.scss';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import { Helmet } from 'react-helmet';
import Loader from "../../Loader/Loader";


const PopularMoviesPage = () => {

  const {popularMovies, isLoading, error} = useSelector((state) => state.popMovies);

  return (

    <>
      <Helmet>
        <title>Top Trending Movies of 2023: Comprehensive Guide to the Most-Watched Films</title>
      </Helmet>

      <div className={styles.container}>
        <h1>Popular Movies</h1>
        <p>Curated collection of popular movies: high-rated, diverse genres, captivating stories. Explore beloved
          films!</p>
        <div className={styles.wrapper}>
          {isLoading ? <Loader/> :
          <>
            {
              popularMovies?.map((film) =>
                <NavLink
                  to={`/movie/${encodeURIComponent(film.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                  onClick={() => localStorage.setItem('movieId', film.id)}
                  key={film.id}
                >
                  <MovieBlock
                    image={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
                  />
                </NavLink>
              )
            }</>
          }
          {error && <p>{error}</p>}

        </div>
      </div>
    </>
  );
};


export default PopularMoviesPage;
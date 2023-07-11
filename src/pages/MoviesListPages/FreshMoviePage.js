import React, { useEffect, useState } from 'react';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import styles from '../Pages.module.scss';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchAPIDataWithOutOptions } from '../../utils/helperFunctions/fetchAPIData';

const FreshMoviePage = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchAPIDataWithOutOptions('movie/upcoming');
      setMovies(movieData);
    };
    fetchData();

  }, []);

  return (
    <>
      <Helmet>
        <title>Newest Movies of 2023: Discover the Latest Cinema Releases</title>
      </Helmet>
      <div className={styles.container}>
        <h1>Fresh movies</h1>
        <p>New movies and series in excellent quality: legal,safe, without ads</p>
        <div className={styles.wrapper}>
          {
            movies?.results.map((movie) =>
              <NavLink
                to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                onClick={() => localStorage.setItem('movieId', movie.id)}
                key={movie.id}
              >
                <MovieBlock
                  image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                />
              </NavLink>
            )
          }
        </div>
      </div>
    </>
  );
};

export default FreshMoviePage;
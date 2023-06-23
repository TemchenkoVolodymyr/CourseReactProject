import React, {useEffect, useState} from 'react';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import styles from '../Pages.module.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";


const TrendingMovie = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovies(data);
      } catch (err) {
        alert('Error');
      }
    }
    fetchMovie();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Trending Movies This Week: Catch the Latest Box Office Hits</title>
      </Helmet>
      <div className={styles.container}>
        <h1>Now Trending: Movies You Can&lsquo;t Miss</h1>
        <p>Explore the most-watched movies making waves around the globe.</p>
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
                  title={movie.title}
                  rating={(movie.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                  canvasShow={true}
                />
              </NavLink>
            )
          }
        </div>
      </div>
    </>
  );
};

export default TrendingMovie;
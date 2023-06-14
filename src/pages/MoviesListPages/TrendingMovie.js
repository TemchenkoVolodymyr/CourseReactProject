import React, { useEffect, useState } from 'react';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import styles from '../Pages.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const TrendingMovie = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovies(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Now Trending: Movies You Can&lsquo;t Miss</h1>
      <p>Explore the most-watched movies making waves around the globe.</p>
      <div className={styles.wrapper}>
        {
          movies?.results.map((movie) =>
            <NavLink
              to={`/movie/${movie.id}`}
              key={movie.id}
            >
              <MovieBlock
                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                title={movie.title}
                rating={(movie.vote_average * 10).toFixed(1)}
                displayAsPercentage ={true}
                canvasShow={true}
              />
            </NavLink>
          )
        }
      </div>
    </div>
  );
};

export default TrendingMovie;
import React, {useEffect, useState} from 'react';
import MovieBlock from "../Components/MovieBlock/MovieBlock";
import axios from "axios";
import styles from './Pages.module.scss'
import {NavLink} from "react-router-dom";

const FreshMoviePage = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovies(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Fresh movies</h1>
      <p>New movies and series in excellent quality: legal,safe, without ads</p>
      <div className={styles.wrapper}>
        {
          movies?.results.map(movie =>
            <NavLink to={`/movie/${movie.id}`} key={movie.id}>
              <MovieBlock
                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                title={movie.title}
              />
            </NavLink>
          )
        }
      </div>


    </div>
  );
};

export default FreshMoviePage;
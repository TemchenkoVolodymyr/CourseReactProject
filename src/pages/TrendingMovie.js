import React, {useEffect, useState} from 'react';
import PageBlock from "../Components/PageBlock/PageBlock";
import styles from "./Pages.module.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";

const TrendingMovie = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovies(data);
      } catch (err) {
        alert('Error');
      }
    }
    fetchMovie();
  }, []);
  console.log(movies);

  return (
    <div className={styles.container}>
      <h1>Now Trending: Movies You Can't Miss</h1>
      <p>Explore the most-watched movies making waves around the globe.</p>
      <div className={styles.wrapper}>
        {
          movies?.results.map(movie =>
            <NavLink to={`/movie/${movie.id}`}>
              <PageBlock
                key={movie.id}
                image={movie.poster_path}
                title={movie.title}
              />
            </NavLink>
          )
        }
      </div>


    </div>
  );
};

export default TrendingMovie;
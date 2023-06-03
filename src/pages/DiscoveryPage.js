import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "./Pages.module.scss";
import {NavLink} from "react-router-dom";
import PageBlock from "../Components/PageBlock/PageBlock";

const DiscoveryPage = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
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
      <h1>Discover Your Next Favorite Film by Category</h1>
      <p>Dive into a vast array of film genres. Find action, romance, comedy, thriller, and more to satisfy your cinematic cravings.</p>
      <div className={styles.wrapper}>
        {
          movies?.genres.map(movie =>
            <NavLink to={`/movie/${movie.id}`}>
              <PageBlock
                key={movie.id}
                image={movie.poster_path}
                title={movie.name}
              />
            </NavLink>
          )
        }
      </div>


    </div>
  );
};

export default DiscoveryPage;
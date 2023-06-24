import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Pages.module.scss';
import {NavLink} from 'react-router-dom';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import {Helmet} from "react-helmet";


const DiscoveryPage = () => {
  const [genres, setGenres] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios
          .get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setGenres(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore & Discover Movies by Genre - Your Ultimate Guide to Film Exploration</title>
      </Helmet>

      <div className={styles.container}>
        <h1>Discover Your Next Favorite Film by Category</h1>
        <p>Dive into a vast array of film genres. Find action, romance, comedy, thriller, and more to
          satisfy your
          cinematic cravings.</p>
        <div className={styles.wrapper}>
          {
            genres?.genres.map((genre) =>
              <NavLink
                to={`/genre/${genre.name.toLowerCase().replace(' ', '-')}`}
                key={genre.id}
              >
                <MovieBlock
                  image={genreImages[genre.id]}
                  title={genre.name}

                />
              </NavLink>
            )
          }
        </div>
      </div>
    </>
  );
};

export default DiscoveryPage;
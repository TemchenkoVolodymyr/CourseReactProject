import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Pages.module.scss';
import { NavLink } from 'react-router-dom';
import MovieBlock from '../Components/MovieBlock/MovieBlock';


const genreImages = {
  28: '/images/genres/action_genre.jpg',
  12: '/images/genres/adventure.jpg',
  16: '/images/genres/animation.jpg',
  35: '/images/genres/comedy.jpg',
  80: '/images/genres/crime.jpg',
  99: '/images/genres/documentary.jpg',
  18: '/images/genres/drama.jpg',
  10751: '/images/genres/family.jpg',
  14: '/images/genres/fantasy.jpg',
  36: '/images/genres/history.jpg',
  27: '/images/genres/horror.jpg',
  10402: '/images/genres/mystery.jpg',
  9648: '/images/genres/music.jpg',
  10749: '/images/genres/romance.jpg',
  878: '/images/genres/science_fiction.jpg',
  10770: '/images/genres/thriller.jpg',
  53: '/images/genres/tv_movie.jpg',
  10752: '/images/genres/war.jpg',
  37: '/images/genres/western.jpg'
};

const DiscoveryPage = () => {
  const [genres, setGenres] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios
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
    <div className={styles.container}>
      <h1>Discover Your Next Favorite Film by Category</h1>
      <p>Dive into a vast array of film genres. Find action, romance, comedy, thriller, and more to
        satisfy your
        cinematic cravings.</p>
      <div className={styles.wrapper}>
        {
          genres?.genres.map((genre) =>
            <NavLink
              to={`/${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
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
  );
};

export default DiscoveryPage;
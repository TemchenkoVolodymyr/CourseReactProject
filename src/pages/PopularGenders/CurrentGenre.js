import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import {useParams} from 'react-router';
import axios from 'axios';
import style from './CurrentGenre.module.scss';
import styles from '../Pages.module.scss';
import { useLocation } from 'react-router-dom';
import genreTitles from "./genreTitles";
import {Helmet} from "react-helmet";

const genreIds = {
  'comedy': 35,
  'cartoons': 878,
  'fantasy': 14,
  'documentary': 99,
  'adventure': 12,
  'animation': 16,
  'crime': 80,
  'drama': 18,
  'action': 28,
  'family': 10751,
  'history': 36,
  'horror': 27,
  'mystery': 9648,
  'music': 10402,
  'romance': 10749,
  'science-fiction': 878,
  'thriller': 53,
  'tv-movie': 10770,
  'war': 10752,
  'western': 37,
};
const CurrentGenre = () => {
  const { genre} = useParams();
  const [currGenre, setCurrGenre] = useState();

  useEffect(() => {
    const currentGenre = genreIds[genre];

    async function fetchMovie() {
      try {
        const {data} = await axios
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${currentGenre}`);
        setCurrGenre(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();

  }, [genre])

  const pageTitle = genreTitles[genre] || '';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={styles.container}>
        <h1>Popular genres: Everyone likes them</h1>
        <h2>{genre}</h2>
        <div className={style.wrapper}>
          {
            currGenre?.results.map((genre) =>
              <NavLink
                key={genre.id}
                to={`/movie/${encodeURIComponent(genre.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                onClick={() => localStorage.setItem('movieId', genre.id)}>
                <MovieBlock
                  image={`https://image.tmdb.org/t/p/w200/${genre.poster_path}`}
                  title={genre.title}
                  rating={(genre.vote_average * 10).toFixed(1)}
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

export default CurrentGenre;
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import {useParams} from 'react-router';
import axios from 'axios';
import style from './CurrentGenre.module.scss';
import styles from '../Pages.module.scss';
import {Helmet} from "react-helmet";
import {genreIds, genreTitles} from "../../constants/data";

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
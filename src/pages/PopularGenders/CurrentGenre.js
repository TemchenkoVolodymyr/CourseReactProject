import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import { useParams } from 'react-router';
import axios from 'axios';
import styles from '../Pages.module.scss';
import { Helmet } from 'react-helmet';
import { genreIds, genreTitles } from '../../constants/data';

const CurrentGenre = () => {
  const { genre } = useParams();
  const [currGenre, setCurrGenre] = useState();

  useEffect(() => {
    const currentGenre = genreIds[genre];

    async function fetchMovie() {
      try {
        const { data } = await axios
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${currentGenre}`);
        setCurrGenre(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();

  }, [genre]);

  const pageTitle = genreTitles[genre].title || '';
  const description = genreTitles[genre].description || '';
  const text = genreTitles[genre].text || '';
  const paragraphs = text.split('\n');

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description}/>
      </Helmet>
      <div className={styles.container}>
        <h1>{pageTitle}</h1>
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <div className={styles.wrapper}>
          {
            currGenre?.results.map((genre) =>
              <NavLink
                key={genre.id}
                to={`/movie/${encodeURIComponent(genre.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                onClick={() => localStorage.setItem('movieId', genre.id)}>
                <MovieBlock
                  image={`https://image.tmdb.org/t/p/w200/${genre.poster_path}`}
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
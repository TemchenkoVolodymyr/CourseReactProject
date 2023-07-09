import React, { useEffect, useState } from 'react';
import styles from '../Pages.module.scss';
import { NavLink } from 'react-router-dom';
import MovieBlock from '../../Components/MovieBlock/MovieBlock';
import { Helmet } from 'react-helmet';
import { genreImages } from '../../constants/data';
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";


const DiscoveryPage = () => {
  const [genres, setGenres] = useState();

  useEffect(() => {

    const fetchGenres = async () => {
      const genresData = await fetchAPIDataWithOutOptions('genre/movie/list')
      setGenres(genresData)
    }

    fetchGenres()

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
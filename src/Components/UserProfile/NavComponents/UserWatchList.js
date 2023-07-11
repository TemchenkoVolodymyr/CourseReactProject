import React, { useEffect } from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../UserProfile.module.scss';
import FilmComponent from './FilmComponent/FilmComponent';
import NoInfoComponent from './NoInfoComponent';
import { applySortOrder, filterProfileMovies } from '../../../utils/helperFunctions/filterProfieMovies';


const UserWatchList = () => {

  const { watchList, error, isLoading } = useSelector((state) => state.watchList);
  const { filterBy, isOrderOpen } = useSelector((state) => state.filters);


  const sortedWatchList = applySortOrder(filterProfileMovies(watchList, filterBy) , isOrderOpen);
  return (
    <>
      <NavComponentsHeader
        title={'My Watchlist'}
        showFilters={true}
      />
      <section className={styles.pageInfo}>
        {watchList.length === 0 ? <NoInfoComponent/> :
          <>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
              <div>
                {sortedWatchList.map((film) => (
                  film.movieInfo &&
                  <div key={film.movieId}>
                    <FilmComponent
                      image={film.movieInfo.backdrop_path ? film.movieInfo.backdrop_path : film.movieInfo.poster_path}
                      rating={film.movieInfo.vote_average * 10}
                      title={film.movieInfo.title}
                      overview={film.movieInfo.overview}
                      release={film.movieInfo.release_date}
                      id={film.movieInfo.id}
                      source={'watchlist'}
                    />
                  </div>
                ))}
              </div>
            )}
            {error && <div>Error: {error}</div>}</>}
      </section>

    </>
  );
};

export default UserWatchList;
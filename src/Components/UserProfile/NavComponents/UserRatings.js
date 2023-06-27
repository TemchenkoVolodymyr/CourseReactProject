import React, { useEffect } from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import styles from '../UserProfile.module.scss';
import NoInfoComponent from './NoInfoComponent';
import FilmComponent from './FilmComponent/FilmComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatings } from '../../../redux/slices/userRatingsSlice';
import { filterProfileMovies } from '../../../utils/helperFunctions/filterProfieMovies';


const UserRatings = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const ratings = useSelector((state) => state.ratings.ratings);
  const isLoading = useSelector((state) => state.ratings.isLoading);
  const error = useSelector((state) => state.ratings.error);
  const filterBy = useSelector((state) => state.filters.filterBy);

  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchRatings(userId));
    }
  }, [isLoading, userId]);

  const selectSortOptionForPage = (state, page) => {
    return state.filters.sortOptions[page];
  };

  const ratingSortOption = useSelector((state) => selectSortOptionForPage(state, 'page2'));

  const sortedRatingList = filterProfileMovies(ratings, filterBy, ratingSortOption);

  return (
    <>
      <NavComponentsHeader
        title={'My Ratings'}
        showFilters={true}/>

      <section className={styles.pageInfo}>
        {ratings.length === 0 ? <NoInfoComponent/> :
          <>
            {isLoading === 'loading' && <div>Loading...</div>}
            {isLoading === 'succeeded' && (
              <div>
                {sortedRatingList?.map((rating) => (
                  rating.movieInfo &&
                  <div key={rating.id}>
                    <FilmComponent
                      image={rating.movieInfo.backdrop_path ? rating.movieInfo.backdrop_path : rating.movieInfo.poster_path}
                      rating={rating.movieInfo.vote_average * 10}
                      title={rating.movieInfo.title}
                      overview={rating.movieInfo.overview}
                      release={rating.movieInfo.release_date}
                      id={rating.movieInfo.id}
                      source={'ratings'}
                    />
                  </div>
                ))}
              </div>
            )}
            {isLoading === 'failed' && <div>Error: {error}</div>}</>
        }

      </section>

    </>

  );
};

export default UserRatings;
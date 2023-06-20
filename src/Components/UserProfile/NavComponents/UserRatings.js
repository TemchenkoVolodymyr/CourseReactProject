import React, { useEffect } from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import styles from '../UserProfile.module.scss';
import NoInfoComponent from './NoInfoComponent';
import FilmComponent from './FilmComponent/FilmComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatings } from '../../../redux/slices/userRatingsSlice';


const UserRatings = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const ratings = useSelector((state) => state.ratings.ratings);
  const isLoading = useSelector((state) => state.ratings.isLoading);
  const error = useSelector((state) => state.ratings.error);


  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchRatings(userId));
    }

  }, [isLoading, userId]);

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
            {ratings.map((rating) => (
              rating.movieInfo &&
              <div key={rating.id}>
                <FilmComponent
                  image={rating.movieInfo.backdrop_path}
                  rating={rating.movieInfo.vote_average * 10}
                  title={rating.movieInfo.title}
                  overview={rating.movieInfo.overview}
                  release={rating.movieInfo.release_date}
                  id={rating.movieInfo.id}
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
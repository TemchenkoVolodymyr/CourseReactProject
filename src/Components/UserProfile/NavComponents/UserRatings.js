import React from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import styles from '../UserProfile.module.scss';
import NoInfoComponent from './NoInfoComponent';
import FilmComponent from './FilmComponent/FilmComponent';
import {useSelector} from 'react-redux';
import {applySortOrder, filterProfileMovies} from '../../../utils/helperFunctions/filterProfieMovies';


const UserRatings = () => {
  const { ratings } = useSelector((state) => state.ratings);
  const { filterBy, isOrderOpen } = useSelector((state) => state.filters);

  const selectSortOptionForPage = (state, page) => {
    return state.filters.sortOptions[page];
  };

  const ratingSortOption = useSelector((state) => selectSortOptionForPage(state, 'page2'));

  const sortedRatingList = applySortOrder(filterProfileMovies(ratings, filterBy, ratingSortOption) , isOrderOpen)

  return (
    <>
      <NavComponentsHeader
        title={'My Ratings'}
        showFilters={true}/>

      <section className={styles.pageInfo}>
        {ratings.length === 0 ? <NoInfoComponent/> :
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
        }
      </section>
    </>

  );
};

export default UserRatings;
import React from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import { useSelector } from 'react-redux';
import FilmComponent from './FilmComponent/FilmComponent';
import styles from '../UserProfile.module.scss';
import NoInfoComponent from './NoInfoComponent';
import { applySortOrder, filterProfileMovies } from '../../../utils/helperFunctions/filterProfieMovies';

const UserFavorites = () => {

  const { favorites } = useSelector((state) => state.favorites);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const error = useSelector((state) => state.favorites.error);
  const { filterBy, isOrderOpen } = useSelector((state) => state.filters);

  const sortedFavorites = applySortOrder(filterProfileMovies(favorites, filterBy), isOrderOpen );

  return (
    <>
     <NavComponentsHeader
       title={'My Favorites'}
       showFilters={true}/>
      <section className={styles.pageInfo}>
        {favorites.length === 0 ? <NoInfoComponent/> :
         <>
           {isLoading && <div>Loading...</div>}
           {!isLoading && (
             <div>
               {sortedFavorites?.map((favorite) => (
                 favorite.movieInfo &&
                 <div key={favorite.movieId}>
                   <FilmComponent
                     image={favorite.movieInfo.backdrop_path ? favorite.movieInfo.backdrop_path : favorite.movieInfo.poster_path}
                     rating={(favorite.movieInfo.vote_average).toFixed(1) * 10}
                     title={favorite.movieInfo.title}
                     overview={favorite.movieInfo.overview}
                     release={favorite.movieInfo.release_date}
                     id={favorite.movieInfo.id}
                     source={'favorites'}
                   />
                 </div>
               ))}
             </div>
           )}
           {error && <div>Error: {error}</div>}</>
        }

      </section>
    </>


  );
};

export default UserFavorites;
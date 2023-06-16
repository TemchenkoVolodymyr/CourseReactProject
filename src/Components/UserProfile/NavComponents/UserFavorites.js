import React, { useEffect } from 'react';
import NavComponentsHeader from './NavComponentsHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../../redux/slices/favoriteSlice';
import FilmComponent from './FilmComponent/FilmComponent';
import styles from '../UserProfile.module.scss';
import NoInfoComponent from "./NoInfoComponent";

const UserFavorites = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.favorites.favorites);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const error = useSelector((state) => state.favorites.error);


  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchFavorites(userId));
    }

  }, [isLoading, userId]);


  return (
    <>
     <NavComponentsHeader
       title={'My Favorites'}
       showFilters={true}/>

      <section className={styles.pageInfo}>
        {favorites.length === 0 ? <NoInfoComponent/> :
         <>
           {isLoading === 'loading' && <div>Loading...</div>}
           {isLoading === 'succeeded' && (
             <div>
               {favorites.map((favorite) => (
                 favorite.movieInfo &&
                 <div key={favorite.movieId}>
                   <FilmComponent
                     image={favorite.movieInfo.backdrop_path}
                     rating={favorite.movieInfo.vote_average * 10}
                     title={favorite.movieInfo.title}
                     overview={favorite.movieInfo.overview}
                     release={favorite.movieInfo.release_date}
                     id={favorite.movieInfo.id}
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

export default UserFavorites;
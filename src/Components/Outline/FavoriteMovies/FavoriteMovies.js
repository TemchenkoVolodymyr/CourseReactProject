import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../Outline.module.scss';
import CircleRating from '../../Ratings/CircleRating/CircleRating';
import CustomButton from '../../Button/CustomButton';
import { useDispatch } from 'react-redux';
import {fetchUserFavorites} from "../../../http/favoriteAPI";


const FavoriteMovies = ({ userId, isLoading, favorites }) => {

    const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchUserFavorites(userId));
    }
  }, [userId, isLoading, favorites]);


    return (
      <section>
        <div className={style.container}>
          <h3>FAVORITE</h3>
          {isLoading === 'loading' && <div>Loading...</div>}
          {favorites.length > 0 && favorites?.slice(0, 4).map((movie) =>
            <NavLink
              key={movie?.id}
              to={`/movie/${encodeURIComponent(movie?.movieInfo.title.replace(/[\s:]/g, '-').toLowerCase())}`}
              onClick={() => localStorage.setItem('movieId', movie.movieInfo.id)}
            >
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.movieInfo.poster_path})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
                className={style.wrapperBox}>

                <div className={style.wrapperAbout}>
                  <div>
                    <h3 className={style.item}>{movie?.movieInfo.original_title}</h3>
                  </div>
                  <div>
                    <CircleRating
                      rating={movie?.movieInfo.vote_average * 10}
                      displayAsPercentage={true}
                      size={60}/>
                  </div>
                </div>
              </div>
            </NavLink>
          )}
        </div>

        <div className={style.btn}>
          <CustomButton name={'see more'} path={'/u/favorites'}></CustomButton>
        </div>
      </section>
    );
  }
;

export default FavoriteMovies;
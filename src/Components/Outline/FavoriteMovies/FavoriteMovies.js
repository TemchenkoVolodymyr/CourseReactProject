import React, { useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import style from '../Outline.module.scss';
import CircleRating from '../../CircleRating/CircleRating';
import CustomButton from '../../Button/CustomButton';
import {useDispatch, useSelector} from "react-redux";
import {fetchFavorites} from "../../../redux/slices/favoriteSlice";



const FavoriteMovies = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const favorites = useSelector((state) => state.favorites.favorites);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  console.log(favorites);


  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [isLoading, userId]);

    return (
      <div>
        <h3>FAVORITE</h3>
        {favorites && favorites.slice(0, 5).map((movie) =>
          <NavLink
            key={movie.id}
            to={`/movie/${movie.movieInfo.id}`}
          >
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.movieInfo.poster_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
              className={style.wrapperBox}>

              <div className={style.wrapperAbout}>
                <div>
                  <h3 className={style.item}>{movie.movieInfo.original_title}</h3>
                  <p className={style.item}>{movie.movieInfo.category}</p></div>
                <div>
                  <CircleRating
                    rating={movie.movieInfo.vote_average * 10}
                    displayAsPercentage={true}
                    size={70}/>
                </div>
              </div>
            </div>
          </NavLink>)}

        <div className={style.btn}>
          <CustomButton name={'see more'} path={'/u/favorites'}></CustomButton>
        </div>
      </div>
    );
  }
;

export default FavoriteMovies;
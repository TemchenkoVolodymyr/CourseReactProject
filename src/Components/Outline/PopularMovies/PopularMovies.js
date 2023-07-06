import React from 'react';
import { useSelector } from 'react-redux';
import style from '../Outline.module.scss';
import { NavLink } from 'react-router-dom';
import CircleRating from '../../Ratings/CircleRating/CircleRating';
import CustomButton from '../../Button/CustomButton';


const PopularMovies = () => {

  const popMovie = useSelector((state) => state.movies.popularMovie);

  return (
    <>
      <div className={style.container}>
        <h3>POPULAR MOVIES </h3>
        {popMovie && popMovie.slice(0, 4).map((movie) =>
          <NavLink
            key={movie.id}
            to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
            onClick={() => localStorage.setItem('movieId', movie.id)}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
              className={style.wrapperBox}
            >
              <div className={style.wrapperAbout}>
                <div>
                  <h3 className={style.item}>{movie.original_title}</h3>
                </div>
                <div>
                  <CircleRating
                    rating={movie.vote_average * 10}
                    displayAsPercentage={true}
                    size={50}/>
                </div>
              </div>
            </div>
          </NavLink>)}
      </div>
      <div className={style.btn}>
        <CustomButton name={'see more'} path={'popMovies'}></CustomButton>
      </div>

    </>
  );
};

export default PopularMovies;


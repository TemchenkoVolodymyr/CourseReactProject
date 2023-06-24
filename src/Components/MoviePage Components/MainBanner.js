import React from 'react';
import style from '../../pages/MoviePage/MoviePage.module.scss';
import { NavLink } from 'react-router-dom';

const MainBanner = ({movie}) => {
  const image = movie.poster_path ? movie.poster_path : movie.backdrop_path
  return (
    <section
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${image})` }}
      className={style.banner}>
      <div className={style.info}>
        <h1>{movie.title}</h1>
        <p>{movie.release_date.substring(0, 4)} - {movie.production_countries.map((country) => country.iso_3166_1).join(', ')} - {movie.runtime} min</p>
        <p>
          <span>Genres: </span>
          {movie.genres.map((genre, index) => (
            <React.Fragment key={genre.id}>
              <NavLink
                to={`/genre/${genre.name.toLowerCase().replace(' ', '-')}`}>{genre.name} </NavLink>
              {index !== movie.genres.length - 1 && ', '}
            </React.Fragment>
          ))}
        </p>
        <p><span>Actors: </span>
          {movie.credits.cast.slice(0, 5).map((actor, index) => (
            <React.Fragment key={actor.id}>
              <NavLink
                to={`/person/${actor.name.toLowerCase().replace(' ', '-')}`}
                onClick={() => localStorage.setItem('actorId', actor.id)}
              >{actor.name} </NavLink>
              {index !== movie.credits.cast.slice(0, 5).length - 1 && ', '}
            </React.Fragment>
          ))}

        </p>
      </div>
    </section>
  );
};

export default MainBanner;
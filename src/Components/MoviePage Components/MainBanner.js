import React from 'react';
import style from '../../pages/MoviePage/MoviePage.module.scss';
import { NavLink } from 'react-router-dom';
import CircleRating from "../Ratings/CircleRating/CircleRating";
import {useMediaQuery} from "@mui/material";
import ActionBar from "../Action Bar/ActionBar";

const MainBanner = ({ movie }) => {
  const image = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (

    <section className={style.main}>
        <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${image})` }}
             className={style.main__banner}>

        </div>
      <div className={style.main__info}>
        <h1>{movie.title}</h1>
        <p className={style.data}>{movie.release_date.substring(0, 4)} - {movie.production_countries.map((country) => country.iso_3166_1).join(', ')} - {movie.runtime} min</p>
        <ActionBar movie={movie} movieId={movie.id} source="moviePage" />
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
          <p>{movie.overview}</p>
        <div className={style.additional}>
          <div>
            <p>Original Language: {movie.original_language.toUpperCase()}</p>
            <p>Budget: $ {movie.budget}</p>
            <p>Revenue: $ {movie.revenue}</p>
          </div>
            <CircleRating
              rating={(movie.vote_average).toFixed(1) * 10}
              size={isMobile ? 100 : 90}
              displayAsPercentage={true}
            />
        </div>
      </div>

    </section>

  );
};

export default MainBanner;
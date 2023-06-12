import React from 'react';
import {useSelector} from "react-redux";
import style from "./PopularMovies.module.scss";
import star from "../../../assets/star.svg"
import CustomLink from "../../../router/CustomLink/CustomLink";
import {NavLink} from "react-router-dom";


const PopularMovies = () => {

  let popMovie = useSelector((state) => state.movies.popularMovie);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/'

  return (
    <>
      <div className={style.container}>
        <p>POPULAR MOVIES </p>
        {popMovie && popMovie.slice(0, 5).map(movie =>
          <NavLink key={movie.id} to={`/movie/${movie.id}`}>
            <div
              style={{
                backgroundImage: `url(${imageBaseUrl}w500${movie.poster_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
              }}
              className={style.wrapperBox}>

              <div className={style.wrapperAbout}>

                <h3 className={style.item}>{movie.original_title}</h3>
                <p className={style.item}>{movie.category}</p>
                <div className={style.wrapperMark}>
                  <img className={style.mark} src={star} alt="mark"/>
                  <p className={style.item}> {movie.vote_average}</p>

                </div>
              </div>
            </div>
          </NavLink>)}
      </div>
      <div className={style.btn}>
        <CustomLink style={{width: "135px", margin: " 10px 0", textAlign: "center", padding: "5px"}}
                    to={"popMovies"}>see more</CustomLink>
      </div>

    </>
  );
};

export default PopularMovies;

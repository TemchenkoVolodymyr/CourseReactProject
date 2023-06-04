import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from "./PopularMoviesPage.module.scss"
import {NavLink} from "react-router-dom";
import {fetchMovies} from "../../../../redux/slices/movieSlice";

const PopularMoviesPage = () => {


  let dataMovies = useSelector((state) => state.movies.popularMovie);

  let dispatch = useDispatch()
  useEffect(() => {
    const getPopMovies = async () => {
      dispatch(fetchMovies({type: "popularMovie"}))
    }
    if(dataMovies.length < 2){
      getPopMovies()
    }
  },[dataMovies.length])



  const imageBaseUrl = 'https://image.tmdb.org/t/p/';

  let drawMovies = dataMovies.map(film =>
    <div className={style.wrapper}>
      <NavLink to={`/${film.id}`} style={{textDecoration: "none", color: "white"}}>
        <div
          key={film.id}
          id={film.id}
          className={style.wrapperBox}
          style={{
            backgroundImage: `url(${imageBaseUrl}w500${film.poster_path})`, backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}>
          <p>{film.original_title}</p>
        </div>
      </NavLink>
    </div>
  )
  return (
    <div className={style.container}>
      {drawMovies}
    </div>
  );
};

export default PopularMoviesPage;
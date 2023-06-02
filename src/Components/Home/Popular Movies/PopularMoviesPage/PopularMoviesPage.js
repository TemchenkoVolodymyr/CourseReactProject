import React from 'react';
import {useSelector} from "react-redux";
import style from "./PopularMoviesPage.module.scss"

const PopularMoviesPage = () => {


  let dataMovies = useSelector((store) => store.headerMovies)

  console.log(dataMovies)

  let drawMovies = dataMovies.map(film => <div id={film.id} className={style.wrapperBox}>
    <img src={film.url}  alt="film image" />
    <p>{film.name}</p>
    <p>{film.category}</p>
  </div>)
  return (
    <div className={style.container}>
      {drawMovies}
    </div>
  );
};

export default PopularMoviesPage;
import React from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import style from "../Header/Carousel/MovieCarouselLink/MovieCarousel.module.scss";

const CurrentMovie = () => {
  let {id} = useParams()

  let dataMovie = useSelector((store) => store.headerMovies);

  let movie = dataMovie.map(film => {

    if(film.id === Number(id)){

      return <div className={style.container}>
        <img src={film.url} alt="Movie photo" />
        <h3>{film.name}</h3>
        <p>{film.category}</p>
      </div>
    }else{
      return null
    }

  })
  return (
    <>
        {movie && movie}

    </>
  );
};

export default CurrentMovie;
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import style from "./MovieCarousel.module.scss"
const MovieCarousel = () => {

  let [movie, setMovie] = useState(null)

  let {id} = useParams()

  let navigate = useNavigate()

  let movies = useSelector((store) => store.headerMovies)

  useEffect(() => {

    movies.map(film => {

      if (film.id === Number(id)) {
        setMovie(film)
      }
    })
  }, [id])


  const goBack = () => (navigate(-1))




  return (
    <>
    <div>
      {movie ? <div className={style.container}>
        <img src={movie.url} alt="Movie photo" />
        <h3>{movie.name}</h3>
        <p>{movie.category}</p>
      </div> : null}
    </div>
    <button className={style.backBtn} onClick={goBack}>Back</button>
    </>
  );
};

export default MovieCarousel;
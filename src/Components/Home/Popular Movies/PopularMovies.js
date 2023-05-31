import React from 'react';
import {useSelector} from "react-redux";
import style from "./PopularMovies.module.scss";
import star from "../../../assets/star.svg"
import CustomLink from "../../../router/CustomLink/CustomLink";


const PopularMovies = () => {

  let popularMovies = useSelector((store) => store.headerMovies);

  let movie = popularMovies.map(movie =>
    <div key={movie.id}
    style={{backgroundImage:`url(${movie.url})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
    className={style.wrapper}>
      <div className={style.wrapperAbout}>
    <h3 className={style.item}>{movie.name}</h3>
    <p className={style.item}>{movie.category}</p>
    <div className={style.wrapperMark}>
      <img className={style.mark} src={star} alt="mark" />
      <p className={style.item}> {movie.mark}</p>
    </div>
      </div>

  </div>)

  return (
    <>
    <div className={style.container}>
      <p>POPULAR MOVIES </p>
      {movie}
    </div>
      <CustomLink style={{width:"200px",margin:" 10px 0", textAlign:"center"}} to={"popularMovies"}>see more</CustomLink>
    </>
);
};

export default PopularMovies;


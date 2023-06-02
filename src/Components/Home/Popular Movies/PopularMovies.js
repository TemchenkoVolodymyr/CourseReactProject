import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import style from "./PopularMovies.module.scss";
import star from "../../../assets/star.svg"
import CustomLink from "../../../router/CustomLink/CustomLink";
import {Link, NavLink} from "react-router-dom";
import {useParams} from "react-router";


const PopularMovies = () => {

  let popularMovies = useSelector((store) => store.headerMovies);

  let movie = popularMovies.map(movie => {

    return (
    <NavLink key={movie.id} to={`/movie/${movie.id}`}>
      <div
           style={{backgroundImage: `url(${movie.url})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
           className={style.wrapperBox}>
        <div className={style.wrapperAbout}>
          <h3 className={style.item}>{movie.name}</h3>
          <p className={style.item}>{movie.category}</p>
          <div className={style.wrapperMark}>
            <img className={style.mark} src={star} alt="mark"/>
            <p className={style.item}> {movie.mark}</p>
          </div>
        </div>
      </div>
    </NavLink>)

  })

  return (
    <>
      <div className={style.container}>
        <p>POPULAR MOVIES </p>
        {movie}
      </div>
      <div className={style.btn}>
        <CustomLink style={{width: "135px", margin: " 10px 0", textAlign: "center", padding: "5px"}}
                    to={"popMovies"}>see more</CustomLink>
      </div>

    </>
  );
};

export default PopularMovies;


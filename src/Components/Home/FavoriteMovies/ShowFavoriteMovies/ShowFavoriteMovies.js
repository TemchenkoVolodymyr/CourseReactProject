import React from 'react';
import {NavLink} from "react-router-dom";
import style from './ShowFavoriteMovies.module.scss'
import star from "../../../../assets/star.svg";

const ShowFavoriteMovies = (props) => {

    let {data} = props

    const imageBaseUrl = 'https://image.tmdb.org/t/p/';

    let showMovies = data && data.slice(0, 4).map(movie => <NavLink key={movie.id}
                                                                    to={`/movie/${movie.id}`}>
        <div style={{ backgroundImage: `url(${imageBaseUrl}w500${movie.poster_path})`}}
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
    </NavLink>)

    return (
        <>
            {showMovies}
        </>
    );
};

export default ShowFavoriteMovies;
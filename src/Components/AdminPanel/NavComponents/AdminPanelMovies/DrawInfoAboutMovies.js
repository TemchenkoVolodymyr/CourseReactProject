import React from 'react';
import style from "./moviesAP.module.scss";

const DrawInfoAboutMovies = (props) => {

    let {titles, genres, ratings, movies, callback} = props

    return (
        <>
            <div className={style.wrapper}>
                <ul>
                    <li>Title</li>
                    {titles}
                </ul>
                <ul>
                    <li>Genre</li>
                    {genres}
                </ul>
                <ul>
                    <li>Rating</li>
                    {ratings}
                </ul>
                <ul>
                    <li>Action</li>
                    {movies && movies.map(movie =>
                        <li key={movie.id} className={style.deleteMovie} onClick={() => callback(movie.id)}>
                            Delete</li>)}
                </ul>
            </div>
        </>
    );
};

export default DrawInfoAboutMovies;
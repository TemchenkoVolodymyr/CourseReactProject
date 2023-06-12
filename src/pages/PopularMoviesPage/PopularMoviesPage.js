import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from "./PopularMoviesPage.module.scss"
import {NavLink} from "react-router-dom";
import {fetchMovies} from "../../redux/slices/movieSlice";
import styles from "../Pages.module.scss";
import MovieBlock from "../../Components/MovieBlock/MovieBlock";

const PopularMoviesPage = () => {


  let dataMovies = useSelector((state) => state.movies.popularMovie);

  let dispatch = useDispatch()
  useEffect(() => {
    const getPopMovies = async () => {
      dispatch(fetchMovies({type: "popularMovie"}))
    }
    if (dataMovies.length < 2) {
      getPopMovies()
    }
  }, [dataMovies.length])

  return (

    <div className={styles.container}>
      <h1>Popular Movies</h1>
      <p>Curated collection of popular movies: high-rated, diverse genres, captivating stories. Explore beloved
        films!</p>
      <div className={styles.wrapper}>
        {
          dataMovies?.map(film =>
            <NavLink
              to={`/movie/${film.id}`}
              key={film.id}
            >
              <MovieBlock
                image={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
                title={film.title}
              />
            </NavLink>
          )
        }
      </div>
    </div>

  );
};


export default PopularMoviesPage;
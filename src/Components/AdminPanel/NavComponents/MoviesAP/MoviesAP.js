import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import Loader from "../../../../Loader/Loader";
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import style from "./moviesAP.module.scss"


const MoviesAP = () => {
  let [searchData, setSearchData] = useState([]);

  const movies = useSelector((state) => state.movies.discover)
  const genre = useSelector((state) => state.movies.genre);

  const [foundGenre, setFoundGenre] = useState([])


  let dispatch = useDispatch()

  const searchMovie = (foundItem) => foundItem && movies.filter(item => item.title.toLowerCase().includes(foundItem.toLowerCase()))
  useEffect(() => {
    const getDiscover = async () => {
      dispatch(fetchMovies({type: 'discover'}))
    };
    const getGenre = async () => {
      dispatch(fetchMovies({type: 'genre'}))
    };
    getDiscover()
    getGenre()
  }, [])


  let titleMovie = movies.map(movie => <li>{movie.original_title}</li>)
  let ratingMovie = movies.map(movie => <li>{movie.vote_average}</li>)

  for (const movie of movies) {
    for (const genreId of movie.genre_ids) {
      const matchingGenre = genre.find(genre => genre.id === genreId);
      if (matchingGenre) {
        console.log(matchingGenre.name);
      }
    }
  }
  console.log(genre)
  console.log(movies)
  console.log(foundGenre)
  let p = foundGenre.map(genre => <li>{genre}</li>)
  return (
    <div className={style.container}>
      <h3>Movies</h3>
      <UniversalSearch callback={searchMovie} found={searchData} setFound={setSearchData}/>
      {/*{searchData ? searchData.map(foundMovie => <div>{foundMovie.title}</div>) : movies ? movies.map(movie =>*/}
      {/*  <div>{movie.original_title}</div>) : <Loader></Loader>}*/}
      <div className={style.wrapper}>
        <ul>
          <li>Title</li>
          <li>{titleMovie}</li>
        </ul>
        <ul>
          <li>Genre</li>
          <li>{p}</li>
        </ul>
        <ul>
          <li>Rating</li>
          <li>{ratingMovie}</li>
        </ul>
      </div>
    </div>
  );
};

export default MoviesAP;
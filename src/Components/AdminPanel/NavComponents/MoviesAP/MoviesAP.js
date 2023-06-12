import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import style from "./moviesAP.module.scss"
import axios from "axios";


const MoviesAP = () => {
  let [searchData, setSearchData] = useState([]);

  let [searchForMoviesAP,setSearchForMoviesAP] = useState("")

  const movies = useSelector((state) => state.movies.discover)

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
  let genres = movies.map(movie => <li>Fantasy,Action</li>)

  let foundM = searchData && searchData.map(movie => <li>{movie.original_title}</li>)
  let foundG = searchData && searchData.map(movie => <li>NO</li>)
  let foundR = searchData && searchData.map(movie => <li>{movie.vote_average}</li>)
  let foundA = searchData && searchData.map(movie => <li>Delete</li>)



  return (
    <div className={style.container}>
      <h3>Movies</h3>
      <UniversalSearch callback={searchMovie} setFound={setSearchData} value = {searchForMoviesAP} setValue = {setSearchForMoviesAP}/>
      {searchData ? <div className={style.wrapper}>
          <ul>
            <li>Title</li>
            <li>{foundM}</li>
          </ul>
          <ul>
            <li>Genre</li>
            <li>{foundG}</li>
          </ul>
          <ul>
            <li>Rating</li>
            <li>{foundR}</li>
          </ul>
          <ul>
            <li>Action</li>
            <li>{foundA}</li>
          </ul>
        </div> :
        <div className={style.wrapper}>
          <ul>
            <li>Title</li>
            <li>{titleMovie}</li>

          </ul>
          <ul>
            <li>Genre</li>
            <li>{genres}</li>
          </ul>
          <ul>
            <li>Rating</li>
            <li>{ratingMovie}</li>
          </ul>
          <ul>
            <li>Action</li>
            {/*{movies.map(movie =>*/}
            {/*  <li className={style.deleteMovie} onClick={() => deleteMovie(movie.id)}>*/}
            {/*    Delete</li>)}*/}
          </ul>
        </div>}

    </div>
  );
};

export default MoviesAP;
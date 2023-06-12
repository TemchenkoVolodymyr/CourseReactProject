import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {useDispatch, useSelector} from "react-redux";
import UniversalSearch from "./UniversalSearch";
import {NavLink} from "react-router-dom";
import {searchAC} from "./searchAC";

const Search = () => {

  let movies = useSelector((state) => state.movies.discover);

  let [searchForMovie,setSearchForMovie] = useState("")

  let dispatch = useDispatch()


  let [findMovie, setFindMovie] = useState([])
  const searchMovie = (foundItem) => foundItem && movies.filter(item => item.original_title.toLowerCase().includes(foundItem.toLowerCase()))

  let resetSearchInput = () => {
    dispatch(searchAC(""))
  }

  const imageBaseUrl = 'https://image.tmdb.org/t/p/'

  return (
    <div>
      <ul className={style.autocompleted}>
        {findMovie && findMovie.map(item => <div className={style.wrapper}  style={{backgroundImage:`url(${imageBaseUrl}w500${item.backdrop_path})`,backgroundSize:"cover"}}><NavLink className={style.item}  onClick={resetSearchInput}
                                                     to={`/movie/${item.id}`}>{item.original_title}</NavLink></div>)}
      </ul>
      <UniversalSearch callback={searchMovie} setFound={setFindMovie} value={searchForMovie} setValue={setSearchForMovie}/>
    </div>
  );
};

export default Search;
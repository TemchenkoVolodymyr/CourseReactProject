import React,  {useState} from 'react';
import style from "./Search.module.scss"
import {useSelector} from "react-redux";
import UniversalSearch from "./UniversalSearch";

const Search = () => {

  let mediaData = useSelector((store) => store.jsonDataMedia);

  let movies = useSelector((state) => state.movies.discover)

  console.log(movies)

  let [findMovie, setFindMovie] = useState([])
  const searchMovie = (foundItem) => foundItem && movies.filter(item => item.original_title.toLowerCase().includes(foundItem.toLowerCase()))

  return (
    <div>
      <ul className={style.autocompleted}>
        {findMovie && findMovie.map(item => <li className={style.autocompletedItem}>{item.title}</li>)}
      </ul>
      <UniversalSearch callback={searchMovie} found = {findMovie} setFound = {setFindMovie}/>
    </div>
  );
};

export default Search;
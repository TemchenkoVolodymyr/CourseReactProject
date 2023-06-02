import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";
import {useSelector} from "react-redux";
import UniversalSearch from "./UniversalSearch";

const Search = () => {

  let mediaData = useSelector((store) => store.jsonDataMedia);

  let [findMovie, setFindMovie] = useState([])
console.log(findMovie)
  const searchMovie = (foundItem) => foundItem && mediaData.videos.filter(item => item.title.toLowerCase().includes(foundItem.toLowerCase()))

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
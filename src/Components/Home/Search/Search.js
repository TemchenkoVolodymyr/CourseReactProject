import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";
import {useSelector} from "react-redux";

const Search = () => {

  let [search, setSearch] = useState("")

  let mediaData = useSelector((store) => store.jsonDataMedia);

  let [findMovie, setFindMovie] = useState([])


  const changeSearch = (e) => {
    setSearch(e.target.value)

  }
  const searchMovie = () => search && mediaData.videos.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))


  useEffect(() => {
    const x = searchMovie()
    setFindMovie(x && x.map(film => film.title))

  }, [search])

  return (
    <div>
      <BiSearch className={style.icon}></BiSearch>
      <input className={style.search} type="search" placeholder={`Search`} value={search}
             onChange={(e) => changeSearch(e)}></input>
      <ul className={style.autocompleted}>
        {findMovie && findMovie.map(item => <li className={style.autocompletedItem}>{item}</li>)}
      </ul>
    </div>
  );
};

export default Search;
import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";
import {useSelector} from "react-redux";

const Search = () => {

  let [search, setSearch] = useState("")

  let mediaData = useSelector((store) => store.jsonDataMedia);

  let [findMovie,setFindMovie] = useState([])


  // title

  const changeSearch = (e) => {
    setSearch(e.target.value)

  }

  const  searchMovie = () => search && mediaData.videos.map(item => {
    let wrote = item.title.toLowerCase().includes(search.toLowerCase())

    if(wrote) {
      setFindMovie([...findMovie,item.title])   // тут надо проверить массив на наличие фильма который вводим,если он есть то не надо добавлять его в массив
    }

  })


useEffect(() => {
 searchMovie()
},[search])


  return (
    <div>
      <BiSearch className={style.icon}></BiSearch>
      <input className={style.search} type="search" placeholder={`Search`} value={search}
             onChange={(e) => changeSearch(e)}></input>
      <div>
        <div>
          {findMovie && findMovie.map(item => <p>{item}</p>)}
          {/*{search}*/}

        </div>
      </div>
    </div>
  );
};

export default Search;
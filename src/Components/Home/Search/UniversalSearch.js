import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";

const Search = (props) => {

  let {callback,found,setFound} = props

  let [search, setSearch] = useState("")
  const changeSearch = (e) => {
    setSearch(e.target.value)

  }



  useEffect(() => {

    let includes = callback(search)

    setFound(includes && includes.map(item => item))

  }, [search])



  return (
    <div>
      <BiSearch className={style.icon}></BiSearch>
      <input className={style.search} type="search" placeholder={`Search`} value={search}
             onChange={(e) => changeSearch(e)} onBlur={() => setSearch("")}></input>
    </div>
  );
};

export default Search;
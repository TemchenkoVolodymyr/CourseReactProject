import React, {useEffect} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";


const Search = (props) => {

  let {callback, setFound,value,setValue} = props


  useEffect(() => {
    let includes = callback(value)
    setFound(includes && includes.map(item => item))

  }, [value])


  return (
    <div>
      <BiSearch className={style.icon}></BiSearch>
      <input
        className={style.search}
        type="search"
        placeholder={`Search`}
        value={value}
        onChange={(e) => setValue(e.target.value) }></input>
    </div>
  );
};

export default Search;
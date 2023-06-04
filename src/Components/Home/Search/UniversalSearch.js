import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss"
import {BiSearch} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {searchAC} from "./searchAC";

const Search = (props) => {

  let {callback, setFound} = props
  let searchRedux = useSelector((store) => store.search);
  let dispatch = useDispatch();



  useEffect(() => {
    let includes = callback(searchRedux)
    setFound(includes && includes.map(item => item))

  }, [searchRedux])


  return (
    <div>
      <BiSearch className={style.icon}></BiSearch>
      <input className={style.search} type="search" placeholder={`Search`} value={searchRedux}
             onChange={(e) => dispatch(searchAC(e.target.value))}></input>
    </div>
  );
};

export default Search;
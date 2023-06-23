import React, { useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import UniversalSearch from './UniversalSearch';
import { NavLink } from 'react-router-dom';
import { searchAC } from './searchAC';

const Search = () => {

  const movies = useSelector((state) => state.movies.discover);
  const [searchForMovie, setSearchForMovie] = useState('');

  const dispatch = useDispatch();

  const [findMovie, setFindMovie] = useState([]);
  const searchMovie = (foundItem) => foundItem &&
    movies.filter((item) => item.original_title.toLowerCase().includes(foundItem.toLowerCase()));

  const resetSearchInput = () => {
    dispatch(searchAC(''));
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/';

  return (
    <div className={style.container}>
      <ul className={style.autocompleted}>
        {findMovie && findMovie.map((item) => <div key={item.id} className={style.wrapper} style={{
          backgroundImage: `url(${imageBaseUrl}w500${item.backdrop_path})`,
          backgroundSize: 'cover'
        }}
        ><NavLink className={style.item} onClick={resetSearchInput}
                  to={`/movie/${item.id}`}
        >{item.original_title}</NavLink></div>)}
      </ul>
      <UniversalSearch callback={searchMovie} setFound={setFindMovie} value={searchForMovie}
                       setValue={setSearchForMovie}
      />
    </div>
  );
};

export default Search;
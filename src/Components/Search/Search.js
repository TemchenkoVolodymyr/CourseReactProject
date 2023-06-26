import React, { useEffect, useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import UniversalSearch from './UniversalSearch';
import { NavLink } from 'react-router-dom';
import { searchAC } from './searchAC';

const Search = () => {

  const movies = useSelector((state) => state.movies.discover);
  const [searchForMovie, setSearchForMovie] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [clearSearch, setClearSearch] = useState(true);
  const dispatch = useDispatch();
  const [findMovie, setFindMovie] = useState([]);
  const searchMovie = (foundItem) => foundItem &&
    movies.filter((item) => item.original_title.toLowerCase().includes(foundItem.toLowerCase()));

  const resetSearchInput = (id) => {
    localStorage.setItem('movieId', id);
    dispatch(searchAC(''));
  };

  useEffect(() => {
    if (findMovie.length >= 1) {
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  }, [findMovie]);

  useEffect(() => {
    if (!clearSearch) {
      setSearchForMovie('');
      setClearSearch(true);
    }
  }, [clearSearch]);


  const imageBaseUrl = 'https://image.tmdb.org/t/p/';
  return (
    <div className={style.container}>
      <div className={`${style.autocompleted} ${isModal ? style.openModal : null}`}
           onBlur={() => setClearSearch(false)}>
        <ul>
          {findMovie && findMovie.map((item) =>
            <NavLink
              key={item.id}
              className={style.item}
              onClick={() => resetSearchInput(item.id)}
              to={`/movie/${encodeURIComponent(item.title.replace(/[\s:]/g, '-').toLowerCase())}`}
            >
              <div
                key={item.id}
                className={style.wrapper}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
                  backgroundSize: 'cover' }}
              >{item.original_title}</div>
            </NavLink>)}
        </ul>
      </div>
      <UniversalSearch
        callback={searchMovie}
        setFound={setFindMovie}
        value={searchForMovie}
        setValue={setSearchForMovie}
        isModal={isModal}
      />
    </div>
  );
};

export default Search;
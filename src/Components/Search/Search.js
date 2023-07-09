import React, { useEffect, useState } from 'react';
import style from './Search.module.scss';
import { useSelector } from 'react-redux';
import UniversalSearch from './UniversalSearch';
import { NavLink } from 'react-router-dom';

const Search = () => {

  const [isModal, setIsModal] = useState(false);
  const { results } = useSelector((state) => state.search);

  const resetSearchInput = (id) => {
    localStorage.setItem('movieId', id);
  };

  useEffect(() => {
    if (results.length >= 1) {
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  }, [results]);


  return (
    <div className={style.container}>
      <div className={`${style.autocompleted} ${isModal ? style.openModal : null}`}>
        <div>
          {results && results.map((item) =>
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
        </div>
      </div>
      <UniversalSearch/>
    </div>
  );
};

export default Search;
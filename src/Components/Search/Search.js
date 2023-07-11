import React, { useEffect, useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import UniversalSearch from './UniversalSearch';
import { NavLink } from 'react-router-dom';
import { updateQuery, updateResults } from '../../redux/slices/searchSlice';

const Search = ({ setIsSearchOpen }) => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const { results } = useSelector((state) => state.search);

  const resetSearchInput = (id) => {
    localStorage.setItem('movieId', id);
    setIsModal(false);
    setIsSearchOpen(false);
    dispatch(updateQuery(''));
    dispatch(updateResults([]));
  };

  useEffect(() => {
    if (results.length >= 1) {
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  }, [results]);

  const formatDate = (dateStr) => {
    const dateObject = new Date(dateStr);
    const options = { year: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  };

  return (
    <div className={style.container}>
      <UniversalSearch/>
      <div className={`${style.autocompleted} ${isModal ? style.openModal : null}`}>
        <h3>Movies</h3>
        {results && results.map((item) =>
          <NavLink
            key={item.id}
            className={style.item}
            onClick={() => resetSearchInput(item.id)}
            to={`/movie/${encodeURIComponent(item.title.replace(/[\s:]/g, '-').toLowerCase())}`}
          >
            <div className={style.wrapper}>
              <div className={style.wrapper_poster}>
                <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                     alt={item.title} />
              </div>
              <div className={style.wrapper_details}>
                <span className={style.wrapper_details_title}>{item.original_title}</span>
                <span className={style.wrapper_details_text}>{formatDate(item.release_date)}</span>
              </div>
            </div>
          </NavLink>)}
      </div>

    </div>
  );
};

export default Search;
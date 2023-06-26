import React, { useEffect } from 'react';
import style from './UniversalSeach.module.scss';

const Search = (props) => {

  const { callback, setFound, value, setValue } = props;

  useEffect(() => {
    const includes = callback(value);
    setFound(includes && includes.map((item) => item));

  }, [value]);

  return (
    <div className={style.container}>
      <input
        className={style.search}
        type="search"
        placeholder={'Search'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default Search;
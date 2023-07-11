import React, { useEffect, useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery, updateResults } from '../../redux/slices/searchSlice';
import { fetchAPIDataWithOutOptions } from '../../utils/helperFunctions/fetchAPIData';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);
  const [movies, setMovies ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const discoverData = await fetchAPIDataWithOutOptions('discover/movie');
      setMovies(discoverData.results);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.stopPropagation();
    const searchValue = e.target.value;
    dispatch(updateQuery(searchValue));

    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchValue.trim() === '') {
      dispatch(updateResults([]));
    } else {
      dispatch(updateResults(filteredMovies));
    }
  };

  return (
    <div className={style.search}>
      <BsSearch/>
      <input
        type="search"
        placeholder={'Search for movies'}
        value={query}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
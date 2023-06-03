import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import Loader from "../../../../Loader/Loader";
import UniversalSearch from "../../../Home/Search/UniversalSearch";



const MoviesAP = () => {
  let [searchData, setSearchData] = useState([]);

const movies = useSelector((state) => state.movies.discover)
  console.log(movies)
  let dispatch = useDispatch()

  const searchMovie = (foundItem) => foundItem && movies.filter(item => item.title.toLowerCase().includes(foundItem.toLowerCase()))
  useEffect(() => {
    const   getDiscover =  async() => {
      dispatch(fetchMovies({type: 'discover'}))
    };
    getDiscover()
  },[])

  return (
    <div>

      <UniversalSearch callback={searchMovie} found={searchData} setFound={setSearchData}/>
      <h3>Movies</h3>
      {searchData ? searchData.map(foundMovie => <div>{foundMovie.title}</div>) :  movies ? movies.map(movie => <div>{movie.original_title}</div>) : <Loader></Loader>}
    </div>
  );
};

export default MoviesAP;
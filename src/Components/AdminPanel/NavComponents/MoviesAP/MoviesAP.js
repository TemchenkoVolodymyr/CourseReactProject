import React from 'react';
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useAuth} from "../../../../hooks/useAuth";



const MoviesAP = () => {

  let auth = useAuth()
  console.log(auth)





  return (
    <div>
      Movies
    </div>
  );
};

export default MoviesAP;
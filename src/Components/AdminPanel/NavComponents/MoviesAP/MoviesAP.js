import React, {useEffect, useState} from 'react';
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useAuth} from "../../../../hooks/useAuth";
import {setUser} from "../../../../redux/slices/userSlice";
import {collection, getDocs, getFirestore} from "firebase/firestore";



const MoviesAP = () => {




  return (
    <div>
      Movies
    </div>
  );
};

export default MoviesAP;
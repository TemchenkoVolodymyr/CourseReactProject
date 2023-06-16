import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loaderAction } from '../../Loader/loaderAction';

export const fetchMovies = createAsyncThunk(
  'movie/fetchMovies',
  async (params) => {
    const { type } = params;

    let endpoint = '';

    if (type === 'trendingMovies') {
      endpoint = 'trending/movie/day';
    } else if (type === 'popularActors') {
      endpoint = 'person/popular';
    } else if (type === 'discover') {
      endpoint = 'discover/movie';
    } else if (type === 'popularMovie') {
      endpoint = 'movie/popular';
    } else if (type === 'genre') {
      endpoint = 'genre/movie/list';
    }

    // const dispatch = useDispatch();
    const { data } = await
      axios(`https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

    if (data.results) {
      console.log('s')
      // setTimeout(() => {
      //   dispatch(loaderAction());
      // },2000);
      return data.results;
    }

    if (data.genres)
      return data;
  }
);

const initialState = {
  discover: [],
  trendingMovies: [],
  popularActors: [],
  status: 'loading',
  popularMovie: [],
  movies: [],
  genre: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setItems(state, action) {
      state.movies = action.payload;
    }
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.status = 'loading';
      state.trendingMovies = [];
      state.popularActors = [];
      state.discover = [];
      state.popularMovie = [];
      state.genre = [];
    },
    [fetchMovies.fulfilled]: (state, action) => {
      const { type } = action.meta.arg;
      const responseData = action.payload;

      if (type === 'trendingMovies') {
        state.trendingMovies = responseData;
      } else if (type === 'popularActors') {
        state.popularActors = responseData;
      } else if (type === 'discover') {
        state.discover = responseData;
      } else if (type === 'genre') {
        state.genre = responseData;
      } else if (type === 'popularMovie') {
        state.popularMovie = responseData;
      }


      state.status = 'success';
    },
    [fetchMovies.rejected]: (state) => {
      state.status = 'error';
      state.trendingMovies = [];
      state.popularActors = [];
      state.discover = [];
      state.popularMovie = [];
      state.genre = [];
    }
  }
});

export const { setItems } = movieSlice.actions;
export default movieSlice.reducer;
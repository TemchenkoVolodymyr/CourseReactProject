import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (params, thunkAPI) => {
    const { type } = params;
    let endpoint = '';

    if (type === 'trendingMovies') {
      endpoint = 'trending/movie/day';
    } else if (type === 'popularActors') {
      endpoint = 'person/popular';
    } else if (type === 'discover') {
      endpoint = 'discover/movie';
    }else if(type === 'popularMovie') {
      endpoint = 'movie/popular'
    }


    const {data} = await
      axios(`https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    return data.results
  }
)

const initialState = {
  discover: [],
  trendingMovies: [],
  popularActors: [],
  status: 'loading',
  popularMovie:[],
  movies:[],
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setItems(state, action) {
      state.movies = action.payload
    }
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.status = 'loading'
      state.trendingMovies = []
      state.popularActors = []
      state.discover = []
      state.popularMovie = []
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
      } else if (type === 'popularMovie')

      state.status = 'success';
    },
    [fetchMovies.rejected]: (state) => {
      state.status = 'error'
      state.trendingMovies = []
      state.popularActors = []
      state.discover = []
      state.popularMovie = []
    }
  }
})

export const {setItems} = movieSlice.actions
export default movieSlice.reducer
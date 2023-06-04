import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (params, thunkAPI) => {
    const {type} = params;

    let endpoint = '';

    if (type === 'trendingMovies') {
      endpoint = 'trending/movie/day';
    } else if (type === 'popularActors') {
      endpoint = 'person/popular';
    } else if (type === 'discover') {
      endpoint = 'discover/movie';
    } else if (type === 'popularMovie') {
      endpoint = 'movie/popular'
    } else if (type === 'genre') {
      endpoint = 'genre/movie/list'
    }

    const {data} = await
      axios(`https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
    if (data.results)
      return data.results
    if (data.genres)
      return data.genres
  }
)

const initialState = {
  discover: [],
  trendingMovies: [],
  popularActors: [],
  status: 'loading',
  popularMovie: [],
  movies: [],
  genre: [],
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
      state.genre = []
    },
    [fetchMovies.fulfilled]: (state, action) => {
      const {type} = action.meta.arg;
      const responseData = action.payload;

      if (type === 'trendingMovies') {
        state.trendingMovies = responseData;
      } else if (type === 'popularActors') {
        state.popularActors = responseData;
      } else if (type === 'discover') {
        state.discover = responseData;
      } else if (type === 'genre') {
        state.genre = responseData;
      }


      state.status = 'success';
    },
    [fetchMovies.rejected]: (state) => {
      state.status = 'error'
      state.trendingMovies = []
      state.popularActors = []
      state.discover = []
      state.popularMovie = []
      state.genre = []
    }
  }
})

export const {setItems} = movieSlice.actions
export default movieSlice.reducer
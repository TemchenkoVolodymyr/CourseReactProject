import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchUserFavorites} from "../../http/favoriteAPI";
import axios from "axios";
import {deleteWatchListFromDatabase} from "../../http/watchListAPI";

export const loadUserWatchList = createAsyncThunk(
  'watchList/loadUserWatchList',
  async (userId) => {
    try {
      const watchList = await fetchUserFavorites(userId);
      const watchListFilms = watchList.map(async (movie) => {
        const response = await axios(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;
        return {...movie, movieInfo};
      });
      const updatedWatchList = await Promise.all(watchListFilms);
      return updatedWatchList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteUserWatchList = createAsyncThunk(
  'watchList/deleteUserWatchList',
  async ({movieId, userId}, {dispatch, rejectWithValue}) => {
    try {
      await deleteWatchListFromDatabase(movieId);
      return { movieId, userId }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const watchListSlice = createSlice({
  name: 'watchList',
  initialState: {
    watchList: [],
    isListed: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserWatchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserWatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.watchList = action.payload;
        action.payload.forEach((movie) => {
          state.isListed[movie.movieId] = true;
        });
      })
      .addCase(loadUserWatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserWatchList.fulfilled, (state, action) => {
        const {movieId, userId} = action.payload;
        state.watchList = state.watchList.filter( movie => movie.movieId !== movieId || movie.userId !== userId);
        state.isListed[movieId] = false;
      });
  },
});

export default watchListSlice.reducer;
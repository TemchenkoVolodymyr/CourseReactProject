import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteWatchListFromDatabase, fetchUserWatchList } from '../../http/watchListAPI';
import { fetchAPIDataWithOutOptions } from '../../utils/helperFunctions/fetchAPIData';

export const loadUserWatchList = createAsyncThunk(
  'watchList/loadUserWatchList',
  async (userId) => {
      const watchList = await fetchUserWatchList(userId);
      const watchListFilms = watchList.map(async (movie) => {
        const movieInfo = await fetchAPIDataWithOutOptions(`movie/${movie.movieId}`);
        return { ...movie, movieInfo };
      });
      const updatedWatchList = await Promise.all(watchListFilms);
      return updatedWatchList;
  }
);

export const deleteUserWatchList = createAsyncThunk(
  'watchList/deleteUserWatchList',
  async ({ movieId, userId }, { dispatch, rejectWithValue }) => {
    try {
      await deleteWatchListFromDatabase(movieId);
      return { movieId, userId };
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
        const { movieId, userId } = action.payload;
        state.watchList = state.watchList.filter( (movie) => movie.movieId !== movieId || movie.userId !== userId);
        state.isListed[movieId] = false;
      });
  },
});

export default watchListSlice.reducer;
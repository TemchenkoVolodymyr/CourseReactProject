import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchMovieReviews} from "../../http/reviewAPI";


export const loadMovieReviews = createAsyncThunk(
  'reviews/loadMovieReviews',
  async (movieId) => {
    try {
      const movieReviews = await fetchMovieReviews(movieId);
      return movieReviews;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    movieReviews: [],
    userReviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovieReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMovieReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.movieReviews = action.payload;
      })
      .addCase(loadMovieReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});


export default reviewSlice.reducer;
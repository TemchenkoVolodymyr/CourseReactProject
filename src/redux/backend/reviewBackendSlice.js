import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteReviewFromDatabase, fetchMovieReviews, fetchUserReviews, updateReview} from "../../http/reviewAPI";
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";


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

export const loadUserReviews = createAsyncThunk(
  'reviews/loadUserReviews',
  async (userId) => {
      const userReviews = await fetchUserReviews(userId);
      const reviewsList = userReviews.map(async (review) => {
        const movieInfo = await fetchAPIDataWithOutOptions(`movie/${review.movieId}`)
        return {...review, movieInfo};
      });
      const updatedReviews = await Promise.all(reviewsList);
      return updatedReviews;
  }
);

export const updateUsersReviews = createAsyncThunk(
  'reviews/updateUserReviews',
  async ({reviewId, userId, movieId, text}, thunkAPI) => {

    try {
      const updatedReview = await updateReview(reviewId, userId, movieId, text)
      return updatedReview;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserReviews = createAsyncThunk(
  'reviews/deleteUserReviews',
  async (reviewId, {rejectWithValue}) => {
    try {
      await deleteReviewFromDatabase(reviewId);
      return {reviewId}
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    movieReviews: [],
    userReviews: [],
    moviesError: null,
    userReviewsLoading: false,
    userReviewsError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovieReviews.pending, (state) => {
        state.moviesError = null;
      })
      .addCase(loadMovieReviews.fulfilled, (state, action) => {
        state.movieReviews = action.payload;
      })
      .addCase(loadMovieReviews.rejected, (state, action) => {
        state.moviesError = action.error.message;
      })
      .addCase(loadUserReviews.pending, (state, action) => {
        state.userReviewsLoading = true
      })
      .addCase(loadUserReviews.fulfilled, (state, action) => {
        state.userReviews = action.payload;
        state.userReviewsLoading = false
      })
      .addCase(loadUserReviews.rejected, (state, action) => {
        state.userReviewsLoading = false
        state.userReviewsError = action.error.message;
      })
      .addCase(updateUsersReviews.fulfilled, (state, action) => {
        const index = state.userReviews.findIndex(review => review.id === action.payload.id);

        if (index !== -1) {
          state.userReviews[index] = action.payload;
        }
      })
      .addCase(deleteUserReviews.fulfilled, (state, action) => {
        const {reviewId} = action.payload;
        state.userReviews = state.userReviews.filter(review => review.id !== reviewId);
      })
  },
});


export default reviewSlice.reducer;
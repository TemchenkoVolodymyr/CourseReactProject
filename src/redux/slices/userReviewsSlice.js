import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, ref, remove, update} from "firebase/database";
import {dbRealTime} from "../../firebase";
import axios from "axios";

const initialState = {
  userReviews: [],
  status: 'idle',
  error: null
}

export const fetchUserReviews = createAsyncThunk(
  'userReviewsSlice/fetchUserReviews',
  async (email, thunkAPI) => {
  try{
    const reviewsRef = ref(dbRealTime, 'reviews');
    const snapshot = await get(reviewsRef);
    const reviews = snapshot.val();
    const userReviews = [];

    for (const movieId in reviews) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
      const movieInfo = response.data;
      for (const reviewId in reviews[movieId]) {
        const review = reviews[movieId][reviewId];
        if (review.user === email) {
          userReviews.push({
            id: reviewId,
            text: review.text,
            date: review.date,
            movieId: movieId,
            user: review.user,
            movieInfo,
          });
        }
      }
    }

    return userReviews;
  } catch (error) {
    console.error("Error fetching user reviews: ", error);
    return thunkAPI.rejectWithValue(error);
  }
  }
);

export const deleteUserReviews = createAsyncThunk(
  'userReviewsSlice/deleteUserReviews',
  async ({reviewId, movieId}, thunkAPI) => {
    try{
      const reviewsRef = ref(dbRealTime, `reviews/${movieId}/${reviewId}`);

      return remove(reviewsRef);
    } catch (error) {
      console.error("Error removing user review: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const updateUserReview = createAsyncThunk(
  'userReviewsSlice/updateUserReview',
  async ({ reviewId, movieId, updatedText, updatedDate }, thunkAPI) => {
    try {
      const reviewRef = ref(dbRealTime, `reviews/${movieId}/${reviewId}`);
      return update(reviewRef, { text: updatedText, date: updatedDate});

    } catch (error) {

      console.error("Error updating user review: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
)

const userReviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userReviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUserReviews.fulfilled, (state, action) => {
        state.userReviews = state.userReviews.filter(review => review.id !== action.meta.arg.reviewId);
      })
      .addCase(updateUserReview.fulfilled, (state, action) => {
        const { reviewId, updatedText, updatedDate } = action.meta.arg;
        const reviewToUpdateIndex = state.userReviews.findIndex(review => review.id === reviewId);
        if (reviewToUpdateIndex !== -1) {
          state.userReviews[reviewToUpdateIndex] = {
            ...state.userReviews[reviewToUpdateIndex],
            text: updatedText,
            date: updatedDate
          };
        }
      })
  }
});

export default userReviewsSlice.reducer;


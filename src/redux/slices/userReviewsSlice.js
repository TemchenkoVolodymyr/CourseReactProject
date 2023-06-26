import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, ref} from "firebase/database";
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

const userReviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserReviews.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUserReviews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Добавляем отзывы пользователя в состояние
      state.userReviews = action.payload;
    },
    [fetchUserReviews.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export default userReviewsSlice.reducer;


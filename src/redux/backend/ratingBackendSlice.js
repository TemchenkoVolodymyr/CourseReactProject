import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {deleteRatingFromDatabase, fetchUserRatings} from "../../http/ratingAPI";
import axios from "axios";


export const loadUserRatings = createAsyncThunk(
  'ratings/loadUserRatings',
  async (userId) => {
    try {
      const ratings = await fetchUserRatings(userId);
      const ratingList = ratings.map(async (rating) => {
        const response = await axios(`https://api.themoviedb.org/3/movie/${rating.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;
        return { ...rating, movieInfo };
      });
      const updatedRatings = await Promise.all(ratingList);
      return updatedRatings
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserRating = createAsyncThunk(
  'ratings/deleteUserRating',
  async ({movieId, userId}, {dispatch, rejectWithValue}) => {
    try {
      await deleteRatingFromDatabase(movieId);
      return { movieId, userId }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    isRated: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
        action.payload.forEach((movie) => {
          state.isRated[movie.movieId] = true;
        });
      })
      .addCase(loadUserRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserRating.fulfilled, (state, action) => {
        const {movieId, userId} = action.payload;
        state.ratings = state.ratings.filter( rating => rating.movieId !== movieId || rating.userId !== userId);
        state.isRated[movieId] = false;
      });
  },
});


export default ratingsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import {fetchUserRatings} from "../../http/ratingAPI";
import axios from "axios";


export const loadUserRatings = (userId) => {
  return async (dispatch) => {
    try {
      const ratings = await fetchUserRatings(userId);
      const ratingList = ratings.map(async (rating) => {
        const response = await axios(`https://api.themoviedb.org/3/movie/${rating.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;
        return { ...rating, movieInfo };
      });
      const updatedRatings = await Promise.all(ratingList);
      dispatch(addRating(updatedRatings));
    } catch (error) {
      console.log(error);
    }
  };
};


const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    isRated: {}
  },
  reducers: {
    addRating: (state, action) => {
      action.payload.forEach((rating) => {
        const existingRating = state.ratings.find((r) => r.id === rating.id);
        if (!existingRating) {
          state.ratings.push(rating);
          state.isRated[rating.movieId] = true;
        }
      });
    },
    removeRating: (state, action) => {
      const { movieId, userId } = action.payload;
      state.ratings = state.ratings.filter(rating => rating.movieId !== movieId || rating.userId !== userId);
    },

  },
});

export const { addRating, removeRating } = ratingsSlice.actions;

export default ratingsSlice.reducer;
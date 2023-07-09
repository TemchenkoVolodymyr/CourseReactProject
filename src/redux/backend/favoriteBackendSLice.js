import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteFavoriteFromDatabase, fetchUserFavorites} from "../../http/favoriteAPI";
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";

export const loadUserFavorites = createAsyncThunk(
  'favorites/loadUserFavorites',
  async (userId) => {
    try {
      const favorites = await fetchUserFavorites(userId);
      const favoritesList = favorites.map(async (favorite) => {
        const movieInfo = await fetchAPIDataWithOutOptions(`movie/${favorite.movieId}`)
        return {...favorite, movieInfo};
      });
      const updatedFavorites = await Promise.all(favoritesList);
      return updatedFavorites;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteUserFavorites = createAsyncThunk(
  'favorites/deleteUserFavorites',
  async ({movieId, userId}, {dispatch, rejectWithValue}) => {
    try {
      await deleteFavoriteFromDatabase(movieId);
      return {movieId, userId}
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    isFavorite: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        action.payload.forEach((movie) => {
          state.isFavorite[movie.movieId] = true;
        });
      })
      .addCase(loadUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserFavorites.fulfilled, (state, action) => {
        const {movieId, userId} = action.payload;
        state.favorites = state.favorites.filter(favorite => favorite.movieId !== movieId || favorite.userId !== userId);
        state.isFavorite[movieId] = false;
      });
  },
});


export default favoriteSlice.reducer;
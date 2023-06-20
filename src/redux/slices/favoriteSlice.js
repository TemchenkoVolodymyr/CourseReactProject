import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serverTimestamp, addDoc, collection, getDocs, query, deleteDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';

const initialState = {
  favorites: [],
  isLoading: 'idle',
  error: null,
  isFavorite: {}
};

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      await addDoc(collection(db, 'users', userId, 'favorites'), {
        movieId,
        addedAt: serverTimestamp(),
      });
      return { userId, movieId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      const collectionRef = collection(db, `users/${userId}/favorites`);
      const queryRef = query(collectionRef, where('movieId', '==', movieId));
      const snapshot = await getDocs(queryRef);

      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      return { userId, movieId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favoritesSnapshot = await getDocs(query(collection(db, 'users', userId, 'favorites')));
      const favorites = [];

      for (const doc of favoritesSnapshot.docs) {
        const favoriteData = doc.data();
        const movieId = favoriteData.movieId;

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;

        favorites.push({
          id: doc.id,
          movieId,
          movieInfo,
        });
      }
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.fulfilled, (state, action) => {
        const { movieId } = action.payload;
        state.isFavorite = { ...state.isFavorite, [movieId]: true };
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const movieId = action.payload.movieId;
        state.favorites = state.favorites.filter((favorite) => favorite.movieId !== movieId);
        state.isFavorite = { ...state.isFavorite, [movieId]: false };
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.favorites = action.payload;
        action.payload.forEach((favorite) => {
          state.isFavorite = { ...state.isFavorite, [favorite.movieId]: true };
        });
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.payload;
      });

  },

});

export default favoritesSlice.reducer;
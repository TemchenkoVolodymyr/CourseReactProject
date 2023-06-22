import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serverTimestamp, addDoc, collection, getDocs, query, deleteDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';

const initialState = {
  watchList: [],
  isLoading: 'idle',
  error: null,
  isListed: {}

};

export const addToWatchList = createAsyncThunk(
  'watchList/addToWatchList',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      await addDoc(collection(db, 'users', userId, 'watchList'), {
        movieId,
        addedAt: serverTimestamp(),
      });
      return { userId, movieId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFromWatchList = createAsyncThunk(
  'watchList/deleteFromWatchList',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      const collectionRef = collection(db, `users/${userId}/watchList`);
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

export const fetchWatchList = createAsyncThunk(
  'watchList/fetchWatchList',
  async (userId, thunkAPI ) => {
    try {
      const watchListSnapshot = await getDocs(query(collection(db, 'users', userId, 'watchList')));
      const watchList = [];

      for (const doc of watchListSnapshot.docs) {
        const watchListData = doc.data();
        const movieId = watchListData.movieId;
        const addedAt = watchListData.addedAt.toDate();

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;

        watchList.push({
          id: doc.id,
          movieId,
          movieInfo,
          addedAt
        });
      }
      return watchList;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchList.fulfilled, (state, action) => {
        const { movieId } = action.payload;
        state.watchList.push(action.payload);
        state.isListed = { ...state.isListed, [movieId]: true };
      })
      .addCase(deleteFromWatchList.fulfilled, (state, action) => {
        const movieId = action.payload.movieId;
        state.watchList = state.watchList.filter((film) => film.movieId !== movieId);
        state.isListed = { ...state.isListed, [movieId]: false };
      })
      .addCase(fetchWatchList.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.watchList = action.payload;
        action.payload.forEach((film) => {
          state.isListed = { ...state.isListed, [film.movieId]: true };
        });
      })
      .addCase(fetchWatchList.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.payload;
      });

  },

});

export default watchListSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc, doc, getDocs, collection, query, where, deleteDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';


const initialState = {
  ratings: [],
  isLoading: 'idle',
  error: null,
  isRated: {}
};

export const addRating = createAsyncThunk(
  'ratings/addRating',
  async ({ userId, movieId, rating }, thunkAPI) => {
    const docRef = doc(db, 'users', userId, 'ratings', movieId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { rating, updatedAt: serverTimestamp() });
      } else {
        await setDoc(docRef, { movieId: parseInt(movieId), rating, addedAt: serverTimestamp() });
      }
      return { userId, movieId, rating };
    } catch (error) {
      console.error('Error adding rating: ', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchRatings = createAsyncThunk(
  'ratings/fetchRatings',
  async (userId, { rejectWithValue }) => {
    try {
      const ratingsSnapshot = await getDocs(query(collection(db, 'users', userId, 'ratings')));
      const ratings = [];

      for (const doc of ratingsSnapshot.docs) {
        const ratingsData = doc.data();
        const movieId = ratingsData.movieId;
        const addedAt = ratingsData.addedAt.toDate();

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const movieInfo = response.data;

        ratings.push({
          id: doc.id,
          movieId,
          movieInfo,
          rating: ratingsData.rating,
          addedAt
        });
      }
      return ratings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteRatings = createAsyncThunk(
  'ratings/deleteRatings',
  async ({ userId, movieId }, thunkAPI) => {

    try {
      const collectionRef = collection(db, `users/${userId}/ratings`);
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


export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRating.fulfilled, (state, action) => {
        const { movieId } = action.payload;
        state.ratings.push(action.payload);
        state.isRated = { ...state.isRated, [movieId]: true };
      })
      .addCase(deleteRatings.fulfilled, (state, action) => {
        const movieId = action.payload.movieId;
        state.isRated = { ...state.isRated, [movieId]: false };
        state.ratings = state.ratings.filter((rating) => rating.movieId !== movieId);

      })
      .addCase(fetchRatings.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.ratings = action.payload;
        action.payload.forEach((rated) => {
          state.isRated = { ...state.isRated, [rated.movieId]: true };
        });
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.payload;
      });
  },

});

export default ratingsSlice.reducer;
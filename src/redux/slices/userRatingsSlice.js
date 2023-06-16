import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc, doc
} from 'firebase/firestore';
import { db } from '../../firebase';


const initialState = {
  ratings: [],
};

export const addRating = createAsyncThunk(
  'ratings/addRating',
  async ({ userId, movieId, rating }, thunkAPI) => {
    const docRef = doc(db, 'users', userId, 'ratings', movieId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { rating, updatedAt: serverTimestamp() });
      }else {
        await setDoc(docRef, { movieId, rating, addedAt: serverTimestamp() });
      }
      return { userId, movieId, rating };
    } catch (error) {
      console.error("Error adding rating: ", error);
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
        state.ratings.push(action.payload);
      })
  },

});

export default ratingsSlice.reducer;
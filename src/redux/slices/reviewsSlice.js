import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onValue, push, ref, set, get } from 'firebase/database';
import { dbRealTime } from '../../firebase';
import { getAuth } from 'firebase/auth';

const initialState = {
  reviews: [],
  status: 'idle',
  error: null
};

export const setReview = createAsyncThunk(
  'reviews/setReview',
  async ({ text, id }) => {

    try {
      const reference = ref(dbRealTime, 'reviews/' + id);
      const auth = getAuth();
      const currentUser = auth.currentUser.email;
      const date = new Date();
      const newReviewRef = push(reference);

      await set(newReviewRef, {
        text: text,
        date: date.toLocaleDateString(),
        user: currentUser,
      });
      const snapshot = await get(reference);

      const reviews = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        reviews.push(childData);
      });
      return reviews;

    } catch (error) {
      throw new Error('Failed to set review: ' + error.message);
    }
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (id, { dispatch }) => {
    const reference = ref(dbRealTime, 'reviews/' + id);

    onValue(reference, (snapshot) => {
      const reviews = [];
      snapshot.forEach((childSnapshot) => {

        const childData = childSnapshot.val();
        reviews.push(childData);
      });
      dispatch(reviewsReceived(reviews));
    }, (error) => {
      throw error;
    });
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reviewsReceived: (state, action) => {
      state.status = 'succeeded';
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  }
});
export const { reviewsReceived } = reviewsSlice.actions;
export default reviewsSlice.reducer;

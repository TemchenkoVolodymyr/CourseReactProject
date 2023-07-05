import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase";



const initialState = {
  lists: [],
  isLoading: 'idle',
  error: null,
  isInList : {}

};

export const addToList = createAsyncThunk(
  'watchList/addToWatchList',
  async ({ userId, movieId ,listName }, thunkAPI) => {
    try {
      await addDoc(collection(db, 'users', userId, 'lists', listName, 'movies'), {
        movieId,
        addedAt: serverTimestamp(),
      });
      return { userId, movieId, listName };
    } catch (error) {
      console.error(`Error adding document: ${error}`)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const userListsSlice = createSlice({
  name: 'userLists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToList.fulfilled, (state, action) => {
        state.lists.push(action.payload)
        const { movieId } = action.payload;
        state.isInList = { ...state.isInList, [movieId]: true };
    })
  }

});

export default userListsSlice.reducer;
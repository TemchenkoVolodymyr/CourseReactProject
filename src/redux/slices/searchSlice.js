import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { updateQuery, updateResults } = searchSlice.actions;
export default searchSlice.reducer;
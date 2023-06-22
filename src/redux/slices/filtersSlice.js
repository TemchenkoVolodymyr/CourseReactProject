import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isFilterOpen: false,
  isOrderOpen: false,
  filterBy: '',
  sortOptions: {
    page1: 'vote_average',
    page2: 'rating',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    toggleOrder: (state) => {
      state.isOrderOpen = !state.isOrderOpen;
    },
  },
});

export const {
  setFilterBy,
  toggleFilter,
  toggleOrder
} = filtersSlice.actions;

export default filtersSlice.reducer;
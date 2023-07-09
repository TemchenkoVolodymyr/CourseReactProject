import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";

const actorsSlice = createSlice({
  name: 'actors',
  initialState: {
    actingCredits: [],
    productionCredits: [],
    directingCredits: [],
    writingCredits: [],
    creatorCredits: [],
    crewCredits: [],
    selectedDepartment: 'Acting',
    bestActors: []
  },
  reducers: {
    addActingCredits: (state, action) => {
      action.payload.forEach((credit) => {
        state.actingCredits.push(credit);
      });
    },
    addProductionCredits: (state, action) => {
      state.productionCredits = [...state.productionCredits, ...action.payload];
    },
    addDirectingCredits: (state, action) => {
      state.directingCredits = [...state.directingCredits, ...action.payload];
    },
    addWritingCredits: (state, action) => {
      state.writingCredits = [...state.writingCredits, ...action.payload];
    },
    addCreatorCreditsCredits: (state, action) => {
      state.creatorCredits = [...state.creatorCredits, ...action.payload];
    },
    addCrewCreditsCredits: (state, action) => {
      state.crewCredits = [...state.crewCredits, ...action.payload];
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    clearCredits: (state) => {
      state.actingCredits = [];
      state.productionCredits= [];
      state.directingCredits= [];
      state.writingCredits= [];
      state.creatorCredits= [];
      state.crewCredits= [];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loadBestActors.pending, (state) => {
  //
  //     })
  //     .addCase(loadBestActors.fulfilled, (state) => {
  //
  //     })
  //     .addCase(loadBestActors.rejected, (state) => {
  //
  //     })
  // }
});

export const {
  addActingCredits,
  addProductionCredits,
  addDirectingCredits,
  addWritingCredits,
  addCreatorCreditsCredits,
  addCrewCreditsCredits,
  clearCredits,
  setSelectedDepartment } = actorsSlice.actions;

export default actorsSlice.reducer;
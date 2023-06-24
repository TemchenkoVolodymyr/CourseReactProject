import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  actingCredits: [],
  productionCredits: [],
  directingCredits: [],
  writingCredits: [],
  creatorCredits: [],
  crewCredits: [],
  selectedDepartment: 'Acting',
};

const actorCreditsSlice = createSlice({
  name: 'credits',
  initialState,
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
    clearCredits: state => {
      state.actingCredits = [];
      state.productionCredits= [];
      state.directingCredits= [];
      state.writingCredits= [];
      state.creatorCredits= [];
      state.crewCredits= [];
    },
  },
});

export const {
  addActingCredits,
  addProductionCredits,
  addDirectingCredits,
  addWritingCredits,
  addCreatorCreditsCredits,
  addCrewCreditsCredits,
  clearCredits,

  setSelectedDepartment } = actorCreditsSlice.actions;

export default actorCreditsSlice.reducer;
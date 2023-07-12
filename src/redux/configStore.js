
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducers';


const store = configureStore({
  reducer
});

export default store;

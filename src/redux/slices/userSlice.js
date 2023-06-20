import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: null,
  token: null,
  id: null,
  admin: null,
  userName: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.admin = action.payload.admin;
      state.userName = action.payload.userName;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.admin = null;
      state.userName = null;
    },
  },

});

export const {
  setUser,
  removeUser,

} = userSlice.actions;
export default userSlice.reducer;
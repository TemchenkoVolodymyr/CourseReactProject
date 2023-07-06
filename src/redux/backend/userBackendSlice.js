import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  isAuth: false,
  user: {}
}

const userBackendSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setIsAuth: (state,action) => {
        state.isAuth = action.payload
      },
      setUser: (state,action) => {
        state.user = action.payload
      }
    }
  }
)


export const {setIsAuth, setUser } = userBackendSlice.actions;
export default userBackendSlice.reducer;
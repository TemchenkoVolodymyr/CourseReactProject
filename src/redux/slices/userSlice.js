import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore";


const initialState = {
  email: null,
  token: null,
  id: null,
  admin: null,
  userName: null,
  date: null
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({email, password}, thunkAPI) => {
    try {
      const auth = getAuth();
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      return {
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        admin: userData.admin || false,
        userName: userData.userName,
        date: userData.date,
      };
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/user-not-found') {
        errorMessage = 'User not found. Please register.';
      }
      return thunkAPI.rejectWithValue({message: errorMessage});
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({userName, email, password}, thunkAPI) => {
    try {
      const auth = getAuth();
      const db = getFirestore();

      // Check if the username is already taken
      const userQuerySnapshot = await getDocs(query(collection(db, 'users'), where('userName', '==', userName)));
      if (!userQuerySnapshot.empty) {
        throw new Error('This username is already in use. Please try another one.');
      }

      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        date: new Date().toLocaleDateString(),
        admin: false,
        userName: userName,
      });

      return {
        email: user.email,
        id: user.uid,
        admin: false,
        userName: userName,
        date: new Date().toLocaleDateString(),
      };
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please try another one.';
      }
      return thunkAPI.rejectWithValue({message: errorMessage});
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.admin = null;
      state.userName = null;
      state.date = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.admin = action.payload.admin;
        state.userName = action.payload.userName;
        state.date = action.payload.date;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.admin = action.payload.admin;
        state.userName = action.payload.userName;
        state.date = action.payload.date;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {removeUser} = userSlice.actions;
export const selectUserStatus = state => state.user.status;
export default userSlice.reducer;
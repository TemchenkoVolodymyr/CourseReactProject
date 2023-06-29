import { onAuthStateChanged } from 'firebase/auth';
import { loginUser, removeUser, setUser } from '../../redux/slices/userSlice';


export const unsubscribe = (auth,dispatch) => onAuthStateChanged(auth, (user) => {

  if (user) {
    // User is signed in.
    dispatch(loginUser.fulfilled({
      email: user.email,
      id: user.uid,
      token: user.refreshToken,
      admin: false
    }));
  } else {
    // User is signed out.
    dispatch(removeUser());
  }
});
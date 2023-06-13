import { onAuthStateChanged } from 'firebase/auth';
import { removeUser, setUser } from '../../redux/slices/userSlice';


export const unsubscribe = (auth,dispatch) => onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken
        }));
    } else {
        // User is signed out.
        dispatch(removeUser());
    }
});
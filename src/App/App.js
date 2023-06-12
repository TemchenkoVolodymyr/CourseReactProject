import './App.css';
import {useDispatch,} from "react-redux";
import {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {removeUser, setUser} from "../redux/slices/userSlice";
import RoutersCollection from "./RoutersCollection/RoutersCollection";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);


  return (
    <>
      <RoutersCollection></RoutersCollection>
    </>
  );
}


export default App;
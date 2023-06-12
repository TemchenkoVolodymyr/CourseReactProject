import './App.css';
import {useDispatch,} from "react-redux";
import {useEffect} from "react";
import {getAuth} from "firebase/auth"
import RoutersCollection from "./RoutersCollection/RoutersCollection";
import {unsubscribe} from "./SetAuthUsers/setAuthUsers";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {

        const auth = getAuth();
        unsubscribe(auth, dispatch)

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
import {collection, getDocs} from "firebase/firestore";
import {FilterById} from "./FilterById";
import {fetchMovies} from "../../../../redux/slices/movieSlice";


export const getMainDataToMovies = (movies, dispatch, setAdminPanelMovies, db) => {

    const getBlackListMovies = async (movies) => {
        const blackListRef = collection(db, 'blacklistMovies');
        const snapshot = await getDocs(blackListRef)
        let blackListFirestore = snapshot.docs.map(doc => doc.data())

        FilterById(movies, blackListFirestore, setAdminPanelMovies)
    };

    getBlackListMovies(movies)
        .catch(error => console.log(error))

    const getDiscover = async () => {
        dispatch(fetchMovies({type: 'discover'}))
    };
    const getGenre = async () => {
        dispatch(fetchMovies({type: 'genre'}))
    };
    getDiscover()
        .catch(error => console.log(error))
    getGenre()
        .catch((error => console.log(error)))
}
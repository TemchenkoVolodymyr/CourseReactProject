import { collection, getDocs } from 'firebase/firestore';
import { FilterById } from './FilterById';
import { fetchMovies } from '../../../../redux/slices/movieSlice';


export const getMainDataToMovies = (movies, dispatch, setAdminPanelMovies, db) => {

    const getBlackListMovies = async (movies) => {
        const blackListRef = collection(db, 'blacklistMovies');
        const snapshot = await getDocs(blackListRef);
        const blackListFirestore = snapshot.docs.map((doc) => doc.data());
console.log(blackListFirestore);
        FilterById(movies, blackListFirestore, setAdminPanelMovies);
    };

    getBlackListMovies(movies)
        .catch((error) => error);

    const getDiscover = async () => {
        dispatch(fetchMovies({ type: 'discover' }));
    };
    const getGenre = async () => {
        dispatch(fetchMovies({ type: 'genre' }));
    };
    getDiscover()
        .catch((error) => error);
    getGenre()
        .catch((error) => error);
};
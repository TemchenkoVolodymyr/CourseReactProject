import {fetchMovies} from "../../../../redux/slices/movieSlice";


export const getMainData =  (dispatch) => {
    const getTrending = async () => {
        dispatch(fetchMovies({type: 'trendingMovies'}))
    };

    const getActors = async () => {
        dispatch(fetchMovies({type: 'popularActors'}))
    };

    const getDiscover = async () => {
        dispatch(fetchMovies({type: 'discover'}))
    };
    const getPopMovies = async () => {
        dispatch(fetchMovies({type: "popularMovie"}))
    }

    getTrending()
        .catch((error => console.log(error)))

    getActors()
        .catch((error => console.log(error)))

    getDiscover()
        .catch((error => console.log(error)))

    getPopMovies()
        .catch((error => console.log(error)))
}
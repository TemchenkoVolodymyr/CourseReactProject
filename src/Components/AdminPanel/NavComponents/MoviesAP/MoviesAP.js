import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../../redux/slices/movieSlice";
import UniversalSearch from "../../../Home/Search/UniversalSearch";
import style from "./moviesAP.module.scss"
import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";



const MoviesAP = () => {

    let [searchData, setSearchData] = useState([]);

    let [copyMoviesData, setCopyMoviesData] = useState(null)

    let [searchForMoviesAP, setSearchForMoviesAP] = useState("");

    let [currentBlackLists,setCurrentBlackLists] = useState(null)

    const movies = useSelector((state) => state.movies.discover)

    let dispatch = useDispatch()
    const db = getFirestore();

    const searchMovie = (foundItem) => foundItem && movies.filter(item => item.title.toLowerCase().includes(foundItem.toLowerCase()))
    const setMoviesToDB = async (movie) => {
        await setDoc(doc(db, "blacklistMovies", movie.id.toString()), {
            title: movie.original_title,
            path: movie.backdrop_path,
            id: movie.id
        })
    }

    useEffect(() => {

        const getBlackListMovies = async (movies) => {
            const blackListRef = collection(db, 'blacklistMovies');
            const snapshot  = await getDocs(blackListRef)

            let blackListDb = snapshot.docs.map(doc => doc.data())
            setCurrentBlackLists(blackListDb)

             movies.map(item => {
                blackListDb.map(blacklist => {
                    if(item.id === blacklist.id) {
                        let index = movies.findIndex((el) => el.id === blacklist.id)
                        if(index !== -1) {

                            let copy = movies.filter(item => !blackListDb.some(blacklist => item.id === blacklist.id))
                            setCopyMoviesData(copy)
                        }
                    }
                })
            })

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
    }, [])


    let titleMovie = copyMoviesData && copyMoviesData.map(movie => <li>{movie.original_title}</li>)
    let ratingMovie = copyMoviesData && copyMoviesData.map(movie => <li>{movie.vote_average}</li>)
    let genres = copyMoviesData && copyMoviesData.map(movie => <li>Fantasy,Action</li>)

    let foundM = searchData && searchData.map(movie => <li>{movie.original_title}</li>)
    let foundG = searchData && searchData.map(movie => <li>NO</li>)
    let foundR = searchData && searchData.map(movie => <li>{movie.vote_average}</li>)
    let foundA = searchData && searchData.map(movie => <li>Delete</li>)

    // blackList func

    const addMovieToBlackList = (id) => {

        const blackListMovieIndex = copyMoviesData.findIndex(movie => movie.id === id);

        if (blackListMovieIndex !== -1) {
            let copy = [...copyMoviesData]

            let blackListMovie = copy.splice(blackListMovieIndex, 1);
            setCopyMoviesData(copy)
            setMoviesToDB(...blackListMovie)
                .catch(error => console.log(error))
        }
    }
// console.log(currentMovies)

    return (
        <div className={style.container}>
            <h3>Movies</h3>
            <UniversalSearch callback={searchMovie} setFound={setSearchData} value={searchForMoviesAP}
                             setValue={setSearchForMoviesAP}/>
            {searchData ? <div className={style.wrapper}>
                    <ul>
                        <li>Title</li>
                        <li>{foundM}</li>
                    </ul>
                    <ul>
                        <li>Genre</li>
                        <li>{foundG}</li>
                    </ul>
                    <ul>
                        <li>Rating</li>
                        <li>{foundR}</li>
                    </ul>
                    <ul>
                        <li>Action</li>
                        <li>{foundA}</li>
                    </ul>
                </div>
                :
                <div className={style.wrapper}>
                    <ul>
                        <li>Title</li>
                        {titleMovie}

                    </ul>
                    <ul>
                        <li>Genre</li>
                        <li>{genres}</li>
                    </ul>
                    <ul>
                        <li>Rating</li>
                        <li>{ratingMovie}</li>
                    </ul>
                    <ul>
                        <li>Action</li>
                        {copyMoviesData && copyMoviesData.map(movie =>
                            <li className={style.deleteMovie} onClick={() => addMovieToBlackList(movie.id)}>
                                Delete</li>)}
                    </ul>
                </div>}

        </div>
    );
};

export default MoviesAP;
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from "./moviesAP.module.scss"
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {getMainDataToMovies} from "./GetMainDataToMovies";
import DrawInfoAboutMovies from "./DrawInfoAboutMovies";
import DrawnInfoToSearch from "./DrowInfoToSeacrh";
import {drawnInfo, drawnInfoSearch} from "./drawnMoviesInfo";
import UniversalSearch from "../../../Search/UniversalSearch";


const MoviesAP = () => {

    let [searchData, setSearchData] = useState([]);

    let [adminPanelMovies, setAdminPanelMovies] = useState(null)

    let [searchMoviesAdminPanel, setSearchMoviesAdminPanel] = useState("");

    const movies = useSelector((state) => state.movies.discover)

    let dispatch = useDispatch()

    const db = getFirestore();

    const searchMovie = (foundMovies) => foundMovies && adminPanelMovies
        .filter(item => item.title.toLowerCase()
            .includes(foundMovies.toLowerCase()))

    const setMoviesToFirestore = async (movie) => {
        await setDoc(doc(db, "blacklistMovies", movie.id.toString()), {
            title: movie.original_title,
            path: movie.backdrop_path,
            id: movie.id
        })
    }

    useEffect(() => {
        getMainDataToMovies(movies, dispatch, setAdminPanelMovies, db)
    }, [])

    const addMovieToBlackList = (id) => {

        const blackListMovieIndex = adminPanelMovies.findIndex(movie => movie.id === id);

        if (blackListMovieIndex !== -1) {

            let copyAdminPanelMovies = [...adminPanelMovies]
            let blackListMovie = copyAdminPanelMovies.splice(blackListMovieIndex, 1);
            setAdminPanelMovies(copyAdminPanelMovies)

            setMoviesToFirestore(...blackListMovie)
                .catch(error => console.log(error))
        }
    }

    return (
        <div className={style.container}>
            <h3>Movies</h3>
            <UniversalSearch callback={searchMovie} setFound={setSearchData} value={searchMoviesAdminPanel}
                             setValue={setSearchMoviesAdminPanel}/>
            {searchData ? <DrawnInfoToSearch
                    movies={drawnInfoSearch("movies")}
                    genres={drawnInfoSearch("genres")}
                    action={drawnInfoSearch("actions")}
                    ratings={drawnInfoSearch("ratings")}
                ></DrawnInfoToSearch>
                :
                <DrawInfoAboutMovies
                    titles={drawnInfo(adminPanelMovies, "title")}
                    ratings={drawnInfo(adminPanelMovies, "rating")}
                    genres={drawnInfo(adminPanelMovies, "genres")}
                    movies={adminPanelMovies}
                    callback={addMovieToBlackList}
                ></DrawInfoAboutMovies>}
        </div>
    );
};

export default MoviesAP;
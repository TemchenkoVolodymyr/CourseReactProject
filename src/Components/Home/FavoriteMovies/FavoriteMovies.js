import React, {useEffect, useState} from 'react';
import {getAuth} from "firebase/auth";
import {fetchMovie} from "../../../hooks/fetchMovies";
import ShowCurrentUserFavoriteMovies from "./CurrentUserMovies/ShowCurrentUserFavoriteMovies";


const FavoriteMovies = () => {

  const [favoriteMovies, setFavoriteMovies] = useState();

  let auth = getAuth()

  useEffect(() => {

    fetchMovie(setFavoriteMovies)
    .catch(error => console.log(error))

  }, []);

return (
    <>
        <ShowCurrentUserFavoriteMovies data={favoriteMovies} auth={auth}/>
    </>
);
}
;

export default FavoriteMovies;
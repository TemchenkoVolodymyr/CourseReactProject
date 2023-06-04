import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import PageBlock from "../../Components/PageBlock/PageBlock";
import {useParams} from "react-router";
import axios from "axios";
import style from "./CurrentGenre.module.scss"

const CurrentGenre = () => {
  const {genre} = useParams()

  const [currGenre, setCurrGenre] = useState()

  let currentGenre = ""

  useEffect(() => {
    if (genre === "comedy")
      currentGenre = 35
    if (genre === "cartoons")
      currentGenre = 878
    if (genre === "fantasy")
      currentGenre = 14
    if (genre === "biography")
      currentGenre = 99

    async function fetchMovie() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${currentGenre}`);
        setCurrGenre(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();

  }, [genre])

  return (
    <>
      <h1>Popular genres: Everyone likes them</h1>
      <p>Find your favorite genre.</p>
      <div className={style.wrapper}>
        {
          currGenre?.results.map(genre =>
            <NavLink to={`/movie/${genre.id}`}>
              <PageBlock
                key={genre.id}
                image={genre.poster_path}
                title={genre.title}
              />
            </NavLink>
          )
        }
      </div>
    </>
  );
};

export default CurrentGenre;
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import style from '../Outline.module.scss';
import CustomLink from '../CustomLink/CustomLink';
import CircleRating from '../../CircleRating/CircleRating';



const FavoriteMovies = () => {

    const [favoriteMovies, setFavoriteMovies] = useState();
    const auth = getAuth();

    useEffect(() => {
      async function fetchMovie() {
        try {
          const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
          setFavoriteMovies(data.results);
        } catch (err) {
          alert('Error');
        }
      }

      fetchMovie();
    }, []);

    const imageBaseUrl = 'https://image.tmdb.org/t/p/';

    const showFavoriteMovies = favoriteMovies && favoriteMovies.slice(0, 4).map((movie) => <NavLink
      key={movie.id}
      to={`/movie/${movie.id}`}
    >
      <div
        style={{
          backgroundImage: `url(${imageBaseUrl}w500${movie.poster_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className={style.wrapperBox}>

        <div className={style.wrapperAbout}>
          <div>
            <h3 className={style.item}>{movie.original_title}</h3>
            <p className={style.item}>{movie.category}</p></div>
          <div>
            <CircleRating
              rating={movie.vote_average * 10}
              displayAsPercentage={true}
              size={70}/>
          </div>
        </div>
      </div>
    </NavLink>);


    if (auth && auth._currentUser && auth._currentUser.length > 1) {
      return <p>To see your favorite movies just log in</p>;
    }
    return (
      <div>
        <h3>FAVORITE</h3>
        {showFavoriteMovies}
        <div className={style.btn}>
          <CustomLink
            style={{ width: '135px', margin: ' 10px 0', textAlign: 'center', padding: '5px' }}
            to={'favoriteMovies'}
          >see more</CustomLink>
        </div>
      </div>
    );
  }
;

export default FavoriteMovies;
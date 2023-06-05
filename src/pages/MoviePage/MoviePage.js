import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import style from "./MoviePage.module.scss";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {NavLink} from "react-router-dom";

const MoviePage = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/'
  console.log(id);
  useEffect(() => {
    async function fetchMovie() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovie(data);
      } catch (err) {
        alert('Error');
      }
    }
    fetchMovie();
  }, [id]);
  console.log(movie);
  if (!movie) {
    return <>Loading....</>;
  }

  return (
    <>
      <div className={style.wrapper}>
        <div
          style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}
          className={style.banner}>
          <div className={style.info}>
            <h1>{movie.title}</h1>
            <p>{movie.release_date.substring(0, 4)} - {movie.production_countries.map(country => country.iso_3166_1).join(', ')} - {movie.runtime} min</p>
            <p><span>Genres:</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><span>Actors:</span> Thomas Holland</p>
          </div>
        </div>
        <h2>Overview</h2>
        <div className={style.overview}>
          <div className={style.about}>
            <p>{movie.overview}</p>
          </div>
          <div className={style.data}>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Original Language:</strong> {movie.original_language.toUpperCase()}</p>
            <p><strong>Budget:</strong> $ {movie.budget}</p>
            <p><strong>Revenue:</strong> $ {movie.revenue}</p>
          </div>
        </div>

        <div>
          <h2>Top Billed Cast</h2>
          <Swiper
            id="main"
            tag="section"
            wrapperTag="ul"
            navigation slidesPerView={5}
            spaceBetween={10}>

            {movie?.credits.cast.map(actor =>
              <SwiperSlide key={actor.id}>
                <div>
                  <img src={`${imageBaseUrl}w200${actor.profile_path}`} alt={actor.name}/>
                  <h3>{actor.name}</h3>
                  <p>{actor.character}</p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

        </div>

        <div>
          <h2>What the Trailer</h2>
          {movie.videos.results.length > 0 && (
            <div>
              {movie?.videos.results
                .filter(video => video.type === "Trailer")
                .slice(0, 1)
                .map(video => (
                  <div key={video.key}>
                    <iframe
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
            </div>
          )}
        </div>
        <h2>Similar</h2>
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={5}
          spaceBetween={10}>

          {movie?.similar.results.map(similar =>
            <SwiperSlide key={similar.id}>
              <NavLink to={`/movie/${similar.id}`}>
                <div className={style.similar}>
                  <img src={`${imageBaseUrl}w200${similar.poster_path}`} alt={similar.title}/>
                </div>
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper>

      </div>
    </>
  );
};

export default MoviePage;



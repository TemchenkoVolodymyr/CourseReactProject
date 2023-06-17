import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './MoviePage.module.scss';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { Navigation } from 'swiper';
import CircleRating from '../../Components/CircleRating/CircleRating';
import SliderItem from '../../Components/SliderItems/SliderItem';
import ActionBar from '../../Components/Action Bar/ActionBar';


const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits,similar`);
        setMovie(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchMovie();

  }, [id]);

  if (!movie) {
    return <>Loading....</>;
  }
  return (
    <>
      <ActionBar
        movieId={movie.id}
      />
      <div className={style.wrapper}>
        <div
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
          className={style.banner}>
          <div className={style.info}>
            <h1>{movie.title}</h1>
            <p>{movie.release_date.substring(0, 4)} - {movie.production_countries.map((country) => country.iso_3166_1).join(', ')} - {movie.runtime} min</p>
            <p>
              <span>Genres: </span>
              {movie.genres.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  <NavLink
                    to={`/genre/${genre.name.toLowerCase().replace(' ', '-')}`}>{genre.name} </NavLink>
                  {index !== movie.genres.length - 1 && ', '}
                </React.Fragment>
              ))}
            </p>
            <p><span>Actors: </span>
              {movie.credits.cast.slice(0, 5).map((actor, index) => (
                <React.Fragment key={actor.id}>
                  <NavLink
                    to={`/person/${actor.name.toLowerCase().replace(' ', '-')}`}
                    onClick={() => localStorage.setItem('actorId', actor.id)}
                  >{actor.name} </NavLink>
                  {index !== movie.credits.cast.slice(0, 5).length - 1 && ', '}
                </React.Fragment>
              ))}

            </p>
          </div>
        </div>

        <h2>Overview</h2>

        <div className={style.overview}>
          <div className={style.rating}>
            <p>User Score</p>
            <CircleRating
              rating={movie.vote_average * 10}
              size={110}
              displayAsPercentage={true}
            />
          </div>
          <div className={style.about}>
            <p>{movie.overview}
            </p>
          </div>
          <div className={style.data}>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Original Language:</strong> {movie.original_language.toUpperCase()}</p>
            <p><strong>Budget:</strong> $ {movie.budget}</p>
            <p><strong>Revenue:</strong> $ {movie.revenue}</p>

          </div>
        </div>

        <div className={style.test}>
          <h2>Top Billed Cast</h2>
          <Swiper
            modules={[Navigation]}
            id="main"
            tag="section"
            wrapperTag="ul"
            navigation
            slidesPerView={5}
            spaceBetween={10}>

            {movie?.credits.cast.slice(0, 20).map((actor) =>
              actor.profile_path &&
              <SwiperSlide key={actor.id}>
                <NavLink
                  to={`/person/${actor.name.replace(/\s/g, '-').toLowerCase()}`}
                  className={style.swiperSlide}
                  onClick={() => localStorage.setItem('actorId', actor.id)}
                >
                  <SliderItem
                    img={actor.profile_path}
                    rating={actor.popularity.toFixed(1)}
                    displayAsPercentage={false}
                    canvasShow={false}
                  />
                  <h3>{actor.name}</h3>
                  <p>{actor.character}</p>
                </NavLink>
              </SwiperSlide>
            )}
          </Swiper>

        </div>

        {/*<div>*/}
        {/*  <h2>Watch the Trailer</h2>*/}
        {/*  {movie.videos.results.length > 0 && (*/}
        {/*    <div>*/}
        {/*      {movie?.videos.results*/}
        {/*        .filter((video) => video.type === 'Trailer')*/}
        {/*        .slice(0, 1)*/}
        {/*        .map((video) => (*/}
        {/*          <div key={video.key}>*/}
        {/*            <iframe*/}
        {/*              width="100%"*/}
        {/*              height="500"*/}
        {/*              src={`https://www.youtube.com/embed/${video.key}`}*/}
        {/*              title={video.name}*/}
        {/*              frameBorder="0"*/}
        {/*              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
        {/*              allowFullScreen*/}
        {/*            ></iframe>*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
        <h2>Similar</h2>
        <Swiper
          modules={[Navigation]}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={5}
          spaceBetween={10}>

          {movie?.similar.results.map((similar) =>
            similar.poster_path &&
            <SwiperSlide key={similar.id}>
              <NavLink to={`/movie/${similar.id}`} className={style.swiperSlide}>
                <SliderItem
                  img={similar.poster_path}
                  rating={(similar.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                  canvasShow={true}
                />
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper>

      </div>
    </>
  );
};

export default MoviePage;



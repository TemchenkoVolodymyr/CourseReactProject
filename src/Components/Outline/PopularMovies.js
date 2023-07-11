import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Outline.module.scss';
import { NavLink } from 'react-router-dom';
import { fetchPopularMovies } from '../../redux/slices/popMoviesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';


const PopularMovies = () => {

  const popMovie = useSelector((state) => state.popMovies.popularMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);

  return (
    <>

      <section className={style.container}>
        <h3>POPULAR MOVIES </h3>
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={1}
          spaceBetween={10}>
          {
            popMovie?.map((movie) =>
              <SwiperSlide key={movie.id}>
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                  className={style.wrapperBox}
                >
                <NavLink
                  key={movie.id}
                  to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                  onClick={() => localStorage.setItem('movieId', movie.id)}>
                </NavLink>
                </div>
              </SwiperSlide>
            )
          }
        </Swiper>
      </section>


    </>
  );
};

export default PopularMovies;


import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { NavLink } from 'react-router-dom';
import style from '../../pages/MoviePage/MoviePage.module.scss';
import SliderItem from '../SliderItems/SliderItem';

const SimilarBlock = ({ movie, windowWidth }) => {
  return (
    <>
      {windowWidth >= 360 && windowWidth < 768 ? <Swiper
          modules={[Navigation]}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={3}
          spaceBetween={10}>

          {movie?.similar.results.map((similar) =>
            similar.poster_path &&
            <SwiperSlide key={similar.id}>
              <NavLink to={`/movie/${similar.id}`} className={style.swiperSlide}>
                <SliderItem
                  img={similar.poster_path ? similar.poster_path : similar.backdrop_path}
                  rating={(similar.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                  canvasShow={true}
                  movieId={similar.id}
                  showActionBadge={true}
                />
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper> :
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
              <NavLink
                to={`/movie/${encodeURIComponent(similar.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                onClick={() => localStorage.setItem('movieId', similar.id)}
                >
                <SliderItem
                  img={similar.poster_path ? similar.poster_path : similar.backdrop_path}
                  rating={(similar.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                  canvasShow={true}
                  movieId={similar.id}
                  showActionBadge={true}
                />
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper>}
    </>
  );
};

export default SimilarBlock;
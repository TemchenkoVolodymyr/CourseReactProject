import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {NavLink} from "react-router-dom";
import style from "./HomeLayout.module.scss";
import SliderItem from "../SliderItems/SliderItem";

const TrendingNowSection = ({trendingMovies,windowWidth }) => {
  return (
    <>
      {windowWidth >= 360 && windowWidth < 768 ? <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={3}
          spaceBetween={10}>
          {
            trendingMovies?.map((movie) =>
              <SwiperSlide key={movie.id}>
                <NavLink
                  to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                  onClick={() => localStorage.setItem('movieId', movie.id )}
                  className={style.swiperSlide}>
                  <SliderItem
                    title={movie.title}
                    img={movie.poster_path}
                    rating={(movie.vote_average * 10).toFixed(1)}
                    displayAsPercentage={true}
                    canvasShow={true}
                    movieId={movie.id}
                    showActionBadge={true}
                  />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper> :
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={7}
          spaceBetween={10}>
          {
            trendingMovies?.map((movie) =>
              <SwiperSlide key={movie.id}>
                <NavLink
                  to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                  className={style.swiperSlide}
                  onClick={() => localStorage.setItem('movieId', movie.id )}>
                  <SliderItem
                    title={movie.title}
                    img={movie.poster_path}
                    rating={(movie.vote_average * 10).toFixed(1)}
                    displayAsPercentage={true}
                    canvasShow={true}
                    movieId={movie.id}
                    showActionBadge={true}
                  />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>}
    </>
  );
};

export default TrendingNowSection;
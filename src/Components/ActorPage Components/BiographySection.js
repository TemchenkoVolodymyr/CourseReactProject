import React from 'react';
import style from "../../pages/ActorPage/ActorPage.module.scss";
import CustomButton from "../Button/CustomButton";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import {NavLink} from "react-router-dom";
import SliderItem from "../SliderItems/SliderItem";

const BiographySection = ({actors, handleReadMoreClick, isExpanded}) => {
  let words = [];
  let displayedWords = [];

  if (actors && actors.biography) {
    words = actors.biography.split(' ');
    displayedWords = isExpanded ? words : words.slice(0, 100);
  }

  return (
    <>
      <h1>{actors?.name}</h1>
      <div className={style.biography}>
        <p>{displayedWords.join(' ')}</p>
        {words.length > 100 && (
          <CustomButton callback={handleReadMoreClick} name={isExpanded ? 'Read Less' : 'Read More'}>
          </CustomButton>
        )}
      </div>
      <div className={style.knowFor}>
        <h2>Known For</h2>
        <Swiper
          modules={[Navigation]}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation
          slidesPerView={1} // 6  // Что бы добавить адаптив к слайдеру , иначе не получается
          spaceBetween={10}>

          {actors.movie_credits.cast.map((movie) =>

            <SwiperSlide key={movie.id}>
              <NavLink
                to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                onClick={() => localStorage.setItem('movieId', movie.id)} className={style.swiperSlide}>
                <SliderItem
                  img={movie.backdrop_path ? movie.backdrop_path : movie.poster_path}
                  rating={(movie.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                />
                <p className={style.nameOfMovie}>{movie.title}</p>
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default BiographySection;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { NavLink } from 'react-router-dom';
import style from '../../pages/MoviePage/MoviePage.module.scss';
import SliderItem from '../SliderItems/SliderItem';

const TopBilledCast = ({ movie, windowWidth }) => {
  return (
    <section>
      {windowWidth >= 360 && windowWidth < 768 ? <Swiper
          modules={[Navigation]}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation
          slidesPerView={3}
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
        </Swiper> :
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
      }
    </section>
  );
};

export default TopBilledCast;
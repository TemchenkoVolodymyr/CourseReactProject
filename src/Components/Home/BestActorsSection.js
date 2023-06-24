import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {NavLink} from "react-router-dom";
import style from "./HomeLayout.module.scss";
import SliderItem from "../SliderItems/SliderItem";

const BestActorsSection = ({windowWidth, popularActors }) => {
  return (
    <>
      {windowWidth >= 360 && windowWidth < 768 ? <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={3}
          spaceBetween={10}>
          {
            popularActors?.map((actor) =>
              <SwiperSlide key={actor.id}>
                <NavLink
                  to={`/person/${actor.name.replace(/\s/g, '-')}`}
                  className={style.swiperSlide}
                  onClick={() => localStorage.setItem('actorId', actor.id)}
                >
                  <SliderItem
                    title={actor.name}
                    img={actor.profile_path}
                    rating={actor.popularity.toFixed(1)}
                    displayAsPercentage={false}
                    canvasShow={false}
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
            popularActors?.map((actor) =>
              <SwiperSlide key={actor.id}>
                <NavLink
                  to={`/person/${actor.name.replace(/\s/g, '-')}`}
                  className={style.swiperSlide}
                  onClick={() => localStorage.setItem('actorId', actor.id)}
                >
                  <SliderItem
                    title={actor.name}
                    img={actor.profile_path}
                    rating={actor.popularity.toFixed(1)}
                    displayAsPercentage={false}
                    canvasShow={false}
                  />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>}
    </>
  );
};

export default BestActorsSection;
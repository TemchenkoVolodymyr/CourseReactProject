import React, {useEffect} from 'react';
import style from "./HomeHeader.module.scss"
import {useDispatch, useSelector} from "react-redux";
import SliderItem from "../../../SliderItems/SliderItem";
import 'swiper/swiper-bundle.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import {NavLink} from "react-router-dom";
import {getMainData} from "./getMainData";
import CustomSwiper from "./Swiper/Swiper";



const HomeHeader = () => {

  SwiperCore.use([Navigation]);

  const dispatch = useDispatch()
  const trendingMovies = useSelector(state => state.movies.trendingMovies);
  const popularActors = useSelector(state => state.movies.popularActors);
  const discover = useSelector(state => state.movies.discover);


  useEffect(() => {

    getMainData(dispatch)

  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h1>watch movies online</h1>
        </div>
        <CustomSwiper data={discover} conditionTitle={}  сonditionImg={} view={1} carousel={true} style={style.swiperSlideMain} slider={false}></CustomSwiper>

        <div className={style.header}>
          <h2>Trending Now </h2>
        </div>
        <CustomSwiper data={trendingMovies} view={7} style={style.swiperSlide} slider={true} carousel={false}></CustomSwiper>
        <div className={style.header}>
          <h2>Best Actors</h2>
        </div>
        <CustomSwiper data={popularActors} conditionTitle={"name"} сonditionImg={"profile_path"} view={7} style={style.swiperSlide} slider={true}/>
      </div>
    </>


  );
};

export default HomeHeader;
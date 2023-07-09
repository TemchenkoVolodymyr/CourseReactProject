import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import style from './HomeLayout.module.scss';
import SliderItem from '../SliderItems/SliderItem';
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";

const TrendingNowSection = ({ windowWidth }) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const moviesData = await fetchAPIDataWithOutOptions('trending/movie/day')
      setMovies(moviesData.results)
    }
    fetchData()
  }, [])

  return (
    <>
      <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={windowWidth >= 360 && windowWidth < 768 ? 3 : 7}
          spaceBetween={10}>
          {
            movies?.map((movie) =>
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
        </Swiper>
    </>
  );
};

export default TrendingNowSection;
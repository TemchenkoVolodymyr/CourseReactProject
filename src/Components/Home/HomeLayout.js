import React, { useEffect, useState } from 'react';
import SliderWithWatchBtn from '../SliderItems/SliderWithWatchBtn';
import style from './HomeLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/slices/movieSlice';
import SliderItem from '../SliderItems/SliderItem';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  SwiperCore.use([Navigation]);

  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const popularActors = useSelector((state) => state.movies.popularActors);
  const discover = useSelector((state) => state.movies.discover);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    const getTrending = async () => {
      dispatch(fetchMovies({ type: 'trendingMovies' }));
    };
    const getActors = async () => {
      dispatch(fetchMovies({ type: 'popularActors' }));
    };
    const getDiscover = () => {
      dispatch(fetchMovies({ type: 'discover' }));
    };
    const getPopMovies = async () => {
      dispatch(fetchMovies({ type: 'popularMovie' }));
    };
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    getTrending();
    getActors();
    getDiscover();
    getPopMovies();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {


  }, []);

  return (
    <>
      <Helmet>
        <title>Latest Movie Trailers, Reviews & Overviews | Ultimate Cinema Guide</title>
      </Helmet>
      <div className={style.wrapper}>
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={1}
          spaceBetween={10}>

          {discover?.map((movie) =>
            <SwiperSlide key={movie.id}>
              <NavLink
                to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
                className={style.swiperSlideMain}
                onClick={() => localStorage.setItem('movieId', movie.id )}>

                <SliderWithWatchBtn
                  windowWidth={windowWidth}
                  rating={(movie.vote_average * 10).toFixed(1)}
                  displayAsPercentage={true}
                  name={movie.title}
                  bg={movie.backdrop_path}
                  id={movie.id}></SliderWithWatchBtn>
              </NavLink>
            </SwiperSlide>
          )}
        </Swiper>

        <div className={style.header}>
          <h2>Trending Now </h2>
        </div>
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
        <div className={style.header}>
          <h2>Best Actors</h2>
        </div>
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
      </div>
    </>


  );
};

export default HomeLayout;
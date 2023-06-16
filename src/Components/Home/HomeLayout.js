import React, { useEffect } from 'react';
import SliderWithWatchBtn from '../SliderItems/SliderWithWatchBtn';
import style from './HomeLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/slices/movieSlice';
import SliderItem from '../SliderItems/SliderItem';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { NavLink } from 'react-router-dom';


const HomeLayout = () => {
  SwiperCore.use([Navigation]);

  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const popularActors = useSelector((state) => state.movies.popularActors);
  const discover = useSelector((state) => state.movies.discover);

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

  getTrending();
  getActors();
  getDiscover();
  getPopMovies();

  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h1>watch movies online</h1>
        </div>
        <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={1}
          spaceBetween={10}>

          {discover?.map((movie) =>
            <SwiperSlide key={movie.id}>
              <NavLink
                to={`/movie/${movie.id}`}
                className={style.swiperSlideMain}>
                <SliderWithWatchBtn
                  rating={(movie.vote_average * 10).toFixed(1)}
                  displayAsPercentage ={true}
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
                  to={`/movie/${movie.id}`}
                  className={style.swiperSlide}>
                    <SliderItem
                      title={movie.title}
                      img={movie.poster_path}
                      rating={(movie.vote_average * 10).toFixed(1)}
                      displayAsPercentage ={true}
                      canvasShow={true}
                    />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>
        <div className={style.header}>
          <h2>Best Actors</h2>
        </div>
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
                  displayAsPercentage ={false}
                  canvasShow={false}
                />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>


      </div>
    </>


  );
};

export default HomeLayout;
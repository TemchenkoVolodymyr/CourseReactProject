import React, {useEffect} from 'react';
import ItemCarousel from "./Carousel/ItemCarousel";
import style from "./HomeHeader.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../redux/slices/movieSlice";
import SliderItem from "../../SliderItems/SliderItem";
import 'swiper/swiper-bundle.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import {NavLink} from "react-router-dom";



const HomeHeader = () => {
  SwiperCore.use([Navigation]);

  const dispatch = useDispatch()
  const trendingMovies = useSelector(state => state.movies.trendingMovies);
  const popularActors = useSelector(state => state.movies.popularActors);
  const discover = useSelector(state => state.movies.discover);


  useEffect(() => {
    const getTrending = async () => {
      dispatch(fetchMovies({type: 'trendingMovies'}))
    };

    const getActors = async () => {
      dispatch(fetchMovies({type: 'popularActors'}))
    };

    const getDiscover =  () => {
      dispatch(fetchMovies({type: 'discover'}))
    };
    const getPopMovies = async () => {
      dispatch(fetchMovies({type: "popularMovie"}))
    }


    getTrending()
    getActors()
    getDiscover()
    getPopMovies()

  }, []);


console.log('home')
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

          {discover?.map(movie =>
            <SwiperSlide  key={movie.id} >
              <NavLink
                to={`/movie/${movie.id}`}
                className={style.swiperSlideMain} >
              <ItemCarousel
                name={movie.title}
                category={movie.category}
                bg={movie.backdrop_path}
                id={movie.id}></ItemCarousel>
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
            trendingMovies?.map(movie =>
              <SwiperSlide key={movie.id}>
                <NavLink
                  to={`/movie/${movie.id}`}
                  className={style.swiperSlide} >
                <SliderItem
                  title={movie.title}
                  img={movie.poster_path}
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
            popularActors?.map(actor =>
              <SwiperSlide className={style.swiperSlide} key={actor.id}>
                  <SliderItem
                  title={actor.name}
                  img={actor.profile_path}
                />
              </SwiperSlide>
            )
          }
        </Swiper>


      </div>
    </>


  );
};

export default HomeHeader;
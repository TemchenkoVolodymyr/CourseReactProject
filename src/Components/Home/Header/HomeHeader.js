import React, {useEffect} from 'react';
import ItemCarousel from "./Carousel/ItemCarousel";
import style from "./HomeHeader.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../../redux/slices/movieSlice";
import Test from "../TestHome/Test";
import 'swiper/swiper-bundle.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import {NavLink} from "react-router-dom";



const HomeHeader = (props) => {
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

    const getDiscover = async () => {
      dispatch(fetchMovies({type: 'discover'}))
    };

    getTrending()
    getActors()
    getDiscover()

  }, []);

  return (
    <>
      <div>
        <div className={style.header}>
          <h3>Watch movies online</h3>
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
          <h3>Trending now </h3>
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
                <Test
                  title={movie.title}
                  img={movie.poster_path}
                />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>
        <div className={style.header}>
          <h3>Best Actors</h3>
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
                  <Test
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
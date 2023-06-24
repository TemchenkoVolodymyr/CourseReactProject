import React, {useEffect, useState} from 'react';
import style from './HomeLayout.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../redux/slices/movieSlice';
import 'swiper/swiper-bundle.css';
import SwiperCore, {Navigation} from 'swiper';
import {Helmet} from "react-helmet";
import MainBannerSection from "./MainBannerSection";
import TrendingNowSection from "./TrendingNowSection";
import BestActorsSection from "./BestActorsSection";
import Search from '../Search/Search';
const HomeLayout = () => {
  SwiperCore.use([Navigation]);

  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const popularActors = useSelector((state) => state.movies.popularActors);
  const discover = useSelector((state) => state.movies.discover);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    const getTrending = async () => {
      dispatch(fetchMovies({type: 'trendingMovies'}));
    };
    const getActors = async () => {
      dispatch(fetchMovies({type: 'popularActors'}));
    };
    const getDiscover = () => {
      dispatch(fetchMovies({type: 'discover'}));
    };
    const getPopMovies = async () => {
      dispatch(fetchMovies({type: 'popularMovie'}));
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

  return (
    <>
      <Helmet>
        <title>Latest Movie Trailers, Reviews & Overviews | Ultimate Cinema Guide</title>
      </Helmet>
      {windowWidth >= 769 && windowWidth <= 1024 ? <div>
        <Search></Search>
        </div> : null}
      <div className={style.wrapper}>
        <MainBannerSection discover={discover} windowWidth={windowWidth}/>
        <h2>Trending Now </h2>
        <TrendingNowSection trendingMovies={trendingMovies} windowWidth={windowWidth}/>
        <h2>Best Actors</h2>
        <BestActorsSection popularActors={popularActors} windowWidth={windowWidth}/>
      </div>
    </>


  );
};

export default HomeLayout;
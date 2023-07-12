import React, { useEffect, useRef } from 'react';
import style from './HomeLayout.module.scss';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import { Helmet } from 'react-helmet';
import MainBannerSection from './MainBannerSection';
import TrendingNowSection from './TrendingNowSection';
import BestActorsSection from './BestActorsSection';
import Search from '../Search/Search';
import { useMediaQuery } from '@mui/material';


const HomeLayout = () => {

  SwiperCore.use([Navigation]);

  const isMobile = useMediaQuery('(min-width: 767px; max-width: 1024px)');

  return (

    <>
      <Helmet>
        <title>Latest Movie Trailers, Reviews & Overviews | Ultimate Cinema Guide</title>
      </Helmet>
      {isMobile ?
        <div>
        <Search/>
        </div> : null}
        <div className={style.wrapper}>
          <MainBannerSection/>
          <h2>Trending Now </h2>
          <TrendingNowSection/>
          <h2>Best Actors</h2>
          <BestActorsSection/>
        </div>
    </>

  );
};

export default HomeLayout;
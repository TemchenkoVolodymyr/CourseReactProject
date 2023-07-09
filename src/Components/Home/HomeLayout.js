import React, { useEffect, useState } from 'react';
import style from './HomeLayout.module.scss';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import { Helmet } from 'react-helmet';
import MainBannerSection from './MainBannerSection';
import TrendingNowSection from './TrendingNowSection';
import BestActorsSection from './BestActorsSection';
import Search from '../Search/Search';


const HomeLayout = () => {
  SwiperCore.use([Navigation]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Latest Movie Trailers, Reviews & Overviews | Ultimate Cinema Guide</title>
      </Helmet>
      {windowWidth >= 769 && windowWidth <= 1024 ?
        <div>
        <Search></Search>
        </div> : null}
        <div className={style.wrapper}>
          <MainBannerSection windowWidth={windowWidth}/>
          <h2>Trending Now </h2>
          <TrendingNowSection windowWidth={windowWidth}/>
          <h2>Best Actors</h2>
          <BestActorsSection windowWidth={windowWidth}/>
        </div>

    </>


  );
};

export default HomeLayout;
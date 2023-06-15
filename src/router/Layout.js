import React, { useEffect, useState } from 'react';
import './Layout.scss';
import { Outlet } from 'react-router';
import Search from '../Components/Search/Search';
import PopularMovies from '../Components/Outline/PopularMovies/PopularMovies';
import FavoriteMovies from '../Components/Outline/FavoriteMovies/FavoriteMovies';
import SectionNavigation from './Navigations/SectionNavigation';
import ScrollButton from './ScrollButton';


const Layout = () => {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };


  return (
    <>
      <div id={'mainContent'} className={'containerTopLayout'}>
        <div className={'containerNav'}>
          <SectionNavigation></SectionNavigation>
        </div>

        <div className={'containerMain'}>
          <Outlet/>
          {showButton && <ScrollButton></ScrollButton>}
        </div>

        <div className={'containerSideBar'}>
          <Search/>
          <PopularMovies/>
          <FavoriteMovies/>
        </div>
      </div>
      <footer className={'footer'}>2023 - mock footer for course react</footer>
    </>
  );
};

export default Layout;
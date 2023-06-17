import React, { useEffect, useState } from 'react';
import './Layout.scss';
import { Outlet } from 'react-router';
import Search from '../Components/Search/Search';
import PopularMovies from '../Components/Outline/PopularMovies/PopularMovies';
import FavoriteMovies from '../Components/Outline/FavoriteMovies/FavoriteMovies';
import SectionNavigation from './Navigations/SectionNavigation';
import ScrollButton from './ScrollButton';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { loaderAction } from '../Loader/loaderAction';
import { fetchMovies } from '../redux/slices/movieSlice';
import CustomizedSwitches from '../Components/Button/switchThemeBtn';


const Layout = () => {

  const [showButton, setShowButton] = useState(false);
  const popMovie = useSelector((state) => state.movies.popularMovie);

  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();
  const getPopMovies = async () => {
    dispatch(fetchMovies({ type: 'popularMovie' }));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    getPopMovies();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (popMovie.length > 1) {
    setTimeout(() => {
      dispatch(loaderAction());
    }, 2000);
  }

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  const [theme, setTheme] = useState('dark');
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');



  };
  useEffect(() => {
    const root = document.querySelector(':root');

    const components = ['body-background','components-background','text-color','btn-color-hover','color-header'];
    components.forEach((component) => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${theme})`,
      );
    });
  },[theme]);

  return (
    <>
      {loading ? <Loader></Loader> : <>
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
            <CustomizedSwitches callback={changeTheme}></CustomizedSwitches>
            <PopularMovies/>
            <FavoriteMovies/>
          </div>
        </div>
        <footer className={'footer'}>2023 - mock footer for course react</footer>
      </>
      }
    </>
  );
};

export default Layout;
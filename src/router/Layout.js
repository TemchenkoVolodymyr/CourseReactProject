import React, { useEffect, useState } from 'react';
import './Layout.scss';
import { Outlet } from 'react-router';
import Search from '../Components/Search/Search';
import PopularMovies from '../Components/Outline/PopularMovies';
import FavoriteMovies from '../Components/Outline/FavoriteMovies';
import ScrollButton from './ScrollButton';
import { useSelector } from 'react-redux';
import CustomizedSwitches from '../Components/Button/switchThemeBtn';
import style from '../Components/Home/HomeLayout.module.scss';
import { NavLink } from 'react-router-dom';
import { BsFilm, BsSearch } from 'react-icons/bs';
import BurgerMenu from '../Components/Home/BurgerMenu/BurgerMenu';
import Navigations from './Navigations/Navigations';
import { useMediaQuery } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

const Layout = () => {

  const [showButton, setShowButton] = useState(false);
  const userId = useSelector((state) => state.users.user.id);
  const isMobile = useMediaQuery('(max-width: 767px) ');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onCLickSearchHandler = (event) => {
    event.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
  };

  const styles = useSpring({
    width: isSearchOpen ? 320 : 0,
    opacity: isSearchOpen ? 1 : 0,
    position: isSearchOpen ? 'absolute' : 'none',
    top: isSearchOpen ? 66 : 65,
    left: isSearchOpen ? 1: 0,
  });

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
  const [theme, setTheme] = useState('dark');
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.querySelector(':root');
    const components = ['body-background', 'components-background', 'text-color', 'btn-color-hover', 'color-header', 'color-input'];
    components.forEach((component) => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${theme})`,
      );
    });
  }, [theme]);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  return (
    <>

      {isMobile ?
        <main className={'containerMain'}>
          <div className={style.logo}>
            <BsSearch onClick={onCLickSearchHandler} size={27}/>
            { isSearchOpen &&
              <animated.div style={styles}><Search setIsSearchOpen={setIsSearchOpen} /></animated.div> }
            <NavLink className={style.logoHeader} to="/">
              <BsFilm size={'20'}/>
              MovieMagic
            </NavLink>
            <BurgerMenu title={'Movies'}/>
          </div>
          <Outlet/>
        </main> :
        <>
          <section id={'mainContent'} className={'containerTopLayout'}>
            {/*right sidebar*/}
            <nav className={'containerNav'}>
              <Navigations/>
            </nav>
            {/*main content*/}
            <main className={'containerMain'}>
              <Outlet/>
              {showButton && <ScrollButton/>}
            </main>
            {/*left sidebar*/}
            <section className={'containerSideBar'}>
              <Search setIsSearchOpen={setIsSearchOpen} />
              <CustomizedSwitches callback={changeTheme}/>
              <PopularMovies/>
              <FavoriteMovies userId={userId}/>
            </section>
          </section>
          {/*<footer className={'footer'}>2023 - mock footer for course react</footer>*/}
        </>
      }
    </>
  );
};

export default Layout;
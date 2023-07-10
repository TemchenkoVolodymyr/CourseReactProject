import React, {useEffect, useState} from 'react';
import './Layout.scss';
import {Outlet, useNavigate} from 'react-router';
import Search from '../Components/Search/Search';
import PopularMovies from '../Components/Outline/PopularMovies/PopularMovies';
import FavoriteMovies from '../Components/Outline/FavoriteMovies/FavoriteMovies';
import ScrollButton from './ScrollButton';
import {useDispatch, useSelector} from 'react-redux';
import CustomizedSwitches from '../Components/Button/switchThemeBtn';
import style from '../Components/Home/HomeLayout.module.scss';
import {NavLink} from 'react-router-dom';
import {BsFilm, BsSearch} from 'react-icons/bs';
import BurgerMenu from '../Components/Home/BurgerMenu/BurgerMenu';
import Navigations from './Navigations/Navigations';
import {useMediaQuery} from "@mui/material";
import {CgProfile} from "react-icons/cg";
import {BiLogIn, BiLogOut} from "react-icons/bi";
import {setIsAuth, setUser} from "../redux/backend/userBackendSlice";


const Layout = () => {

  const [showButton, setShowButton] = useState(false);
  const userId = useSelector((state) => state.users.user.id);
  const isMobile = useMediaQuery('(max-width: 767px)');


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

  return (
    <>
      {!isMobile ?
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
              <Search/>
              <CustomizedSwitches callback={changeTheme}/>
              <PopularMovies/>
              <FavoriteMovies userId={userId}/>
            </section>
          </section>
          {/*<footer className={'footer'}>2023 - mock footer for course react</footer>*/}
        </>
        : <main className={'containerMain'}>
          <div className={style.logo}>
              <BsSearch size={27}/>
              <NavLink className={style.logoHeader} to="/">
                <BsFilm size={'20'}/>
                MovieMagic
              </NavLink>
              <BurgerMenu title={'Movies'}/>

          </div>
          <Outlet/>
        </main>
      }
    </>
  );
};

export default Layout;
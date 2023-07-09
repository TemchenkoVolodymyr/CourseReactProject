import React, {useEffect, useState} from 'react';
import './Layout.scss';
import {Outlet} from 'react-router';
import Search from '../Components/Search/Search';
import PopularMovies from '../Components/Outline/PopularMovies/PopularMovies';
import FavoriteMovies from '../Components/Outline/FavoriteMovies/FavoriteMovies';
import ScrollButton from './ScrollButton';
import {useSelector} from 'react-redux';
import CustomizedSwitches from '../Components/Button/switchThemeBtn';
import style from '../Components/Home/HomeLayout.module.scss';
import {NavLink} from 'react-router-dom';
import {BsFilm} from 'react-icons/bs';
import BurgerMenu from '../Components/Home/BurgerMenu/BurgerMenu';
import Navigations from './Navigations/Navigations';
import {itemMovies} from '../constants/data';


const Layout = () => {

  const [showButton, setShowButton] = useState(false);
  const userId = useSelector((state) => state.users.user.id);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    const root = document.querySelector(':root');

    const components = ['body-background', 'components-background', 'text-color', 'btn-color-hover', 'color-header', 'color-input'];
    components.forEach((component) => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${theme})`,
      );
    });

    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <>
      {windowWidth >= 768 ?
        <>
          <section id={'mainContent'} className={'containerTopLayout'}>
            <nav className={'containerNav'}>
              <Navigations/>
            </nav>
            <main className={'containerMain'}>
              <Outlet/>
              {showButton && <ScrollButton></ScrollButton>}
            </main>
            <section className={'containerSideBar'}>
              <Search/>
              <CustomizedSwitches callback={changeTheme}></CustomizedSwitches>
              <PopularMovies/>
              <FavoriteMovies userId={userId}/>
            </section>

          </section>
          {/*<footer className={'footer'}>2023 - mock footer for course react</footer>*/}
        </>
        : <main className={'containerMain'}>
          <div className={style.header + ' ' + style.headerMain}>
            {windowWidth >= 360 && windowWidth < 768 ? <div className={style.logo}>
                <Search></Search>
                <NavLink className={style.logoHeader} to="/"><BsFilm size={'20'}/><h1>MovieMagic</h1></NavLink>
                <BurgerMenu title={'Movies'} items={itemMovies}></BurgerMenu>
              </div>
              :
              <h1>watch movies online</h1>}
            {windowWidth > 768 && windowWidth < 1024 ? <Search></Search> : null}
          </div>
          <Outlet/>
        </main>}
    </>
  );
};

export default Layout;
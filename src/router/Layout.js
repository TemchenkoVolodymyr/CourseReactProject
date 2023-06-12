import React from 'react';

import Navigations from "./Navigations";
import style from "./Layout.scss"
import {Outlet} from "react-router";
import Search from "../Components/Home/Search/Search";
import PopularMovies from "../Components/Outline/PopularMovies/PopularMovies";
import {useSelector} from "react-redux";
import FavoriteMovies from "../Components/Outline/FavoriteMovies/FavoriteMovies";


const Layout = () => {


  return (
    <>
      <div className={"containerTopLayout"}>
        <div className={"containerNav"}>
          <Navigations/>
        </div>

        <div className={"containerMain"}>
          <Outlet/>
        </div>

        <div className={"containerSideBar"}>
          <Search />
          <PopularMovies />
          <FavoriteMovies />
        </div>
      </div>
      <footer className={"footer"}>2023 - mock footer for course react</footer>
    </>
  )
};

export default Layout;
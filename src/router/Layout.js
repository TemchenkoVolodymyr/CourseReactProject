import React from 'react';
import "./Layout.scss"
import {Outlet} from "react-router";
import Search from "../Components/Search/Search";
import PopularMovies from "../Components/Outline/PopularMovies/PopularMovies";
import FavoriteMovies from "../Components/Outline/FavoriteMovies/FavoriteMovies";
import SectionNavigation from "./Navigations/SectionNavigation";


const Layout = () => {

  return (
    <>
      <div className={"containerTopLayout"}>
        <div className={"containerNav"}>
          <SectionNavigation></SectionNavigation>
        </div>

        <div className={"containerMain"}>
          <Outlet/>
        </div>

        <div className={"containerSideBar"}>
          <Search/>
          <PopularMovies/>
          <FavoriteMovies/>
        </div>
      </div>
      <footer className={"footer"}>2023 - mock footer for course react</footer>
    </>
  )
};

export default Layout;
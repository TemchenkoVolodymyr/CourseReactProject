import React from 'react';
import {Outlet} from "react-router-dom";
import Navigations from "./Navigations";
import style from "./Layout.module.scss"


const Layout = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.nav}>
          <Navigations />
        </div>

        <div className={style.navRightSide}>
          Right side bar
        </div>

        <div className={style.containerOutlet}>

          <Outlet/>
        </div>
      </div>
    </>
  )
};

export default Layout;
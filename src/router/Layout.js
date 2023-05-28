import React from 'react';

import Navigations from "./Navigations";
import style from "./Layout.module.scss"
import {Outlet} from "react-router";


const Layout = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.nav}>
          <Navigations/>
        </div>

        <div className={style.containerOutlet}>
          <Outlet/>
        </div>

        <div className={style.navRightSide}>
          <p>Right mock side bar</p>
        </div>
      </div>
      <footer className={"footer"}>2023 - mock footer for course react</footer>
    </>
  )
};

export default Layout;
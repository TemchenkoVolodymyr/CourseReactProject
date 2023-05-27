import React from 'react';
import {Outlet} from "react-router-dom";
import Navigations from "./Navigations";
import style from "./Layout.module..scss"


const Layout = () => {
  return (
    <>
      <div>
        <div className={style.header}>
          <Navigations />
        </div>
        <div>
          <Outlet/>
        </div>
        <footer>FOOTER</footer>
      </div>
    </>
  )
};

export default Layout;
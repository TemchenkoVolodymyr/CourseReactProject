import React from 'react';

import Navigations from "./Navigations";
import style from "./Layout.scss"
import {Outlet} from "react-router";


const Layout = () => {
  return (
    <>
      <div>
        <div>
          <Navigations/>
        </div>

        <div>
          что то
          <Outlet/>
        </div>

        <div>
          <p>Right mock side bar</p>
        </div>
      </div>
      <footer>2023 - mock footer for course react</footer>
    </>
  )
};

export default Layout;
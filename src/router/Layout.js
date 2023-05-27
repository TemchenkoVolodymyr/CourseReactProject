import React from 'react';
import {Outlet} from "react-router-dom";
import Navigations from "./Navigations";


const Layout = () => {
  return (
    <>
      <div>
        <div>
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
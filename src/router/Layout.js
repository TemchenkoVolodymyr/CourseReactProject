import React from 'react';
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>
        <header>HEADER</header>

        <div className="wrapper__outlet">
          <Outlet/>
        </div>
        <footer>FOOTER</footer>
      </div>
    </>
  )
};

export default Layout;
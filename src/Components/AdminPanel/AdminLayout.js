import React from 'react';
import {Outlet} from "react-router";
import {NavLink} from "react-router-dom";
import style from "./AdminPanel.module.scss";

const AdminLayout = () => {
  return (
    <div>
      <div >
        <div >
          <NavLink to='/static' className={style.item}>Statistics</NavLink>
          {/*<NavLink to={'/adminPanel'} className={style.item}>Users</NavLink>*/}
          {/*<NavLink to={'/adminPanel'} className={style.item}>Movies</NavLink>*/}
          {/*<NavLink to={'/adminPanel'} className={style.item}>Actors</NavLink>*/}
          {/*<NavLink to={'/adminPanel'} className={style.item}>Genres</NavLink>*/}
        </div>
        <div className={"containerMain"}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
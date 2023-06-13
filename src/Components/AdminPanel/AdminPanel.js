import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './AdminPanel.module.scss';
import { Outlet } from 'react-router';

const AdminPanel = () => {



  return (
      <div className={style.container}>
          <div className={style.linkItems}>
              <ul className={style.items}>
                  <NavLink
            to="static"
            className={(navData) => navData.isActive ? style.activeLink : style.item}
                  >Statistics</NavLink>
                  <NavLink
            to="users"
            className={(navData) => navData.isActive ? style.activeLink : style.item}
                  >Users</NavLink>
                  <NavLink
            to="movies"
            className={(navData) => navData.isActive ? style.activeLink : style.item}
                  >Movies</NavLink>
                  <NavLink
            to="actors"
            className={(navData) => navData.isActive ? style.activeLink : style.item}
                  >Actors</NavLink>
                  <NavLink
            to="genres"
            className={(navData) => navData.isActive ? style.activeLink : style.item}
                  >Genres</NavLink>
              </ul>
          </div>
          <div className={style.containerOutlet}>
              <Outlet/>
          </div>
      </div>
  );
};

export default AdminPanel;
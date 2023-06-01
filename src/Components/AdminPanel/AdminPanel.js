import React from 'react';
import {useSelector} from "react-redux";
import {NavLink, Route, Routes} from "react-router-dom";
import style from "./AdminPanel.module.scss"
import AdminLayout from "./AdminLayout";
import Statistics from "./NavComponents/Statistics";
import {Outlet} from "react-router";

const AdminPanel = () => {

  let isAuth = useSelector((store) => store.isAuth);


    return (
      <div className={style.container}>
        <div className={style.linkItems}>

          <ul className={style.items}>
            <NavLink to='static' className={style.item}>Statistics</NavLink>
            <NavLink to='users' className={style.item}>Users</NavLink>
            <NavLink to='movies' className={style.item}>Movies</NavLink>
            <NavLink to='actors' className={style.item}>Actors</NavLink>
            <NavLink to='genres' className={style.item}>Genres</NavLink>
          </ul>
          <Outlet/>
        </div>
      </div>
    );
};

export default AdminPanel;
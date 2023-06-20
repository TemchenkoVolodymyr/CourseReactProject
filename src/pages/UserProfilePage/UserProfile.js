import React from 'react';
import styles from "../../Components/UserProfile/UserProfile.module.scss";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";

const UserProfile = () => {

  return (
    <>
      <nav className={styles.container}>
        <NavLink to={'/u/'}>Profile</NavLink>
        <NavLink to={'/u/favorites'}>Favorites</NavLink>
        <NavLink to={'/u/watchlist'}>Watchlist</NavLink>
        <NavLink to={'/u/ratings'}>Ratings</NavLink>
      </nav>
      <div className={styles.outlet}>
        <Outlet/>
      </div>
    </>
  );
};

export default UserProfile;
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserProfile.module.scss';
import { Outlet } from 'react-router';

const UserProfileNavBar = () => {
  return (
    <>
      <nav className={styles.container}>
        <NavLink to={'/u/favorites'}>Favorites</NavLink>
        <NavLink to={'/u/lists'}>List</NavLink>
        <NavLink to={'/u/watchlist'}>Watchlist</NavLink>
        <NavLink to={'/u/ratings'}>Ratings</NavLink>
      </nav>
      <div className={styles.outlet}>
        <Outlet/>
      </div>
    </>
  );
};

export default UserProfileNavBar;
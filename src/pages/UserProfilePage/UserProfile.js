import React from 'react';
import styles from "../../Components/UserProfile/UserProfile.module.scss";
import {NavLink} from "react-router-dom";
import {Outlet, useParams} from "react-router";
import {HelmetWrapper} from "./HelmetWrapper";


const UserProfile = () => {
  const {userName} = useParams()

  return (
    <>
      <HelmetWrapper title={`Profile - ${userName}`} />
      <nav className={styles.container}>
        <NavLink to={`/u/${userName}`}>Profile</NavLink>
        <NavLink to={`/u/${userName}/favorites`}>Favorites</NavLink>
        <NavLink to={`/u/${userName}/watchlist`}>Watchlist</NavLink>
        <NavLink to={`/u/${userName}/ratings`}>Ratings</NavLink>
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default UserProfile;
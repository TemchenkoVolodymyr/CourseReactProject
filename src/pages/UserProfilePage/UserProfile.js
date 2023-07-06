import React, {useEffect} from 'react';
import styles from '../../Components/UserProfile/UserProfile.module.scss';
import { NavLink } from 'react-router-dom';
import { Outlet, useParams } from 'react-router';
import { HelmetWrapper } from './HelmetWrapper';
import {useDispatch, useSelector} from "react-redux";
import {loadUserRatings} from "../../redux/backend/ratingBackendSlice";
import {loadUserWatchList} from "../../redux/backend/watchListBackEndSlice";
import {loadUserFavorites} from "../../redux/backend/favoriteBackendSLice";


const UserProfile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.users.user.id);

  useEffect(() => {
    dispatch(loadUserRatings(userId))
    dispatch(loadUserWatchList(userId))
    dispatch(loadUserFavorites(userId))
  }, [userId])

  return (
    <>
      <HelmetWrapper title={`Profile - ${userName}`} />
      <nav className={styles.container}>
        <NavLink to={`/u/${userName}`}>Profile</NavLink>
        <NavLink to={`/u/${userName}/favorites`}>Favorites</NavLink>
        <NavLink to={`/u/${userName}/watchlist`}>Watchlist</NavLink>
        <NavLink to={`/u/${userName}/ratings`}>Ratings</NavLink>
        <NavLink to={`/u/${userName}/reviews`}>Reviews</NavLink>
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default UserProfile;
import React, {useEffect} from 'react';
import styles from '../../Components/UserProfile/UserProfile.module.scss';
import { NavLink } from 'react-router-dom';
import { Outlet, useParams } from 'react-router';
import { HelmetWrapper } from './HelmetWrapper';
import {fetchWatchList} from "../../redux/slices/watchListSlice";
import {useDispatch, useSelector} from "react-redux";


const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const isLoading = useSelector((state) => state.watchList.isLoading);

  const { userName } = useParams();

  useEffect(() => {
    if (isLoading === 'idle' && userId) {
      dispatch(fetchWatchList(userId));
    }
  }, [isLoading, userId]);

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
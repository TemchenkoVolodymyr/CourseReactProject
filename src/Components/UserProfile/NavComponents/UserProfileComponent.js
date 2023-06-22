import React, {useEffect, useState} from 'react';
import styles from "../UserProfile.module.scss";
import CircleRating from "../../CircleRating/CircleRating";
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import {loadData} from "../../../utils/helperFunctions/loadUserDataFromFB";

const UserProfileComponent = () => {

  const favorites = useSelector((state) => state.favorites.favorites);
  const watchList = useSelector((state) => state.watchList.watchList);
  const ratings = useSelector((state) => state.ratings.ratings);
  const [userData, setUserData] = useState(null);
  const { id } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const totalRating = ratings.reduce((sum, rating) => sum + (rating.rating * 2), 0);
  const averageRating = totalRating / ratings.length;

  useEffect(() => {
    loadData({setUserData, id});
  }, [id])

  const formatDate = (dateStr) => {
    const dateParts = dateStr.split('.');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let avatarSize = 250;
  if (windowWidth < 500) {
    avatarSize = 100;
  } else if (windowWidth <= 1030) {
    avatarSize = 150;
  } else if (windowWidth <= 1200) {
    avatarSize = 190;
  }


  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <Avatar className={styles.avatar} name={userData && userData.userName} size={avatarSize} round={true} />
        <div className={styles.userInfo}>
          <div className={styles.main}>
            <p className={styles.name}>{userData && userData.userName}</p>
            <p className={styles.membership}>Member since {userData && formatDate(userData.date)}</p>
          </div>
          <div className={styles.ratings}>
            <CircleRating
              rating={isNaN(averageRating) ? 0 : averageRating * 10}
              size={90}
              displayAsPercentage={true}
            />
            <p>Average Movie Score</p>
          </div>
        </div>
      </div>
      <h2>Stats</h2>
      <div className={styles.stats}>
        <div>
          <h3>Total Ratings</h3>
          <p>{ratings.length > 0 ? ratings.length : 0}</p>
        </div>
        <div>
          <h3>Favorite Movies</h3>
          <p>{favorites.length > 0 ? favorites.length : 0}</p>
        </div>
        <div>
          <h3>WatchList</h3>
          <p>{watchList.length > 0 ? watchList.length : 0}</p>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default UserProfileComponent;
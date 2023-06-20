import React from 'react';
import styles from "../UserProfile.module.scss";
import CircleRating from "../../CircleRating/CircleRating";
import Avatar from "react-avatar";
import {useSelector} from "react-redux";

const UserProfileComponent = () => {
  const favorites = useSelector(state => state.favorites.favorites)
  const watchList = useSelector(state => state.watchList.watchList)
  const ratings = useSelector(state => state.ratings.ratings)

  const totalRating = ratings.reduce((sum, rating) => sum + (rating.rating * 2), 0);
  const averageRating = totalRating / ratings.length;
  console.log(averageRating);

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <Avatar className={styles.avatar} name={'kateryna_lanina'} size={250} round={true} />
        <div className={styles.userInfo}>
          <div className={styles.main}>
            <p className={styles.name}>kateryna_lanina</p>
            <p className={styles.membership}>Member since May 2023</p>
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
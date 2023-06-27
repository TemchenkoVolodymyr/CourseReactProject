import React, {useEffect, useState} from 'react';
import styles from '../UserProfile.module.scss';
import CircleRating from '../../CircleRating/CircleRating';
import Avatar from 'react-avatar';
import {useSelector} from 'react-redux';
import {useAuth} from '../../../hooks/useAuth';
import {loadData} from '../../../utils/helperFunctions/loadUserDataFromFB';
import FilmComponent from "./FilmComponent/FilmComponent";

const UserProfileComponent = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const watchList = useSelector((state) => state.watchList.watchList);
  const ratings = useSelector((state) => state.ratings.ratings);
  const [userData, setUserData] = useState(null);
  const [latestFavoriteMovie, setLatestFavoriteMovie] = useState([]);
  const [latestFromWatchList, setLatestFromWatchList] = useState([]);
  const {id} = useAuth();

  const totalRating = ratings.reduce((sum, rating) => sum + (rating.rating * 2), 0);
  const averageRating = totalRating / ratings.length;

  useEffect(() => {
    loadData({setUserData, id});
  }, [id]);

  useEffect(() => {
    const favoritesCopy = [...favorites]
    const latestFavoriteMovie = favoritesCopy.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    setLatestFavoriteMovie(latestFavoriteMovie)

    const watchListCopy = [...watchList]
    const latestFromWatchList = watchListCopy.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    setLatestFromWatchList(latestFromWatchList)

  }, [favorites, watchList]);

  const formatDate = (dateStr) => {
    const dateParts = dateStr.split('.');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return dateObject.toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar className={styles.avatar} name={userData && userData.userName} size={100} round={true}/>
          <div className={styles.main}>
            <p className={styles.name}>{userData && userData.userName}</p>
            <p className={styles.membership}>Member since {userData && formatDate(userData.date)}</p>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.box}>
            <h3>Total Ratings</h3>
            <div className={styles.ratings}>
              <CircleRating
                rating={isNaN(averageRating) ? 0 : averageRating * 10}
                size={70}
                displayAsPercentage={true}
              />
              <p>{ratings.length > 0 ? ratings.length : 0}</p>
            </div>
          </div>
          <div className={styles.box}>
            <h3>Favorite Movies</h3>
            <p>{favorites.length > 0 ? favorites.length : 0}</p>
          </div>
          <div className={styles.box}>
            <h3>WatchList</h3>
            <p>{watchList.length > 0 ? watchList.length : 0}</p>
          </div>
          <p></p>
        </div>
      </div>

      <div className={styles.pageInfo}>
        <h2>Latest Favorite Movie</h2>
        {latestFavoriteMovie && latestFavoriteMovie.length > 0  ?
          <FilmComponent
            image={latestFavoriteMovie[0].movieInfo.backdrop_path ? latestFavoriteMovie[0].movieInfo.backdrop_path : latestFavoriteMovie[0].movieInfo.poster_path}
            rating={latestFavoriteMovie[0].movieInfo.vote_average * 10}
            title={latestFavoriteMovie[0].movieInfo.title}
            overview={latestFavoriteMovie[0].movieInfo.overview}
            release={latestFavoriteMovie[0].movieInfo.release_date}
            id={latestFavoriteMovie[0].movieInfo.id}
            source={'favorites'}
          /> :
          <p>There are no movies on your list.</p>
        }
        <h2>Upcoming From Watchlist</h2>
        {latestFromWatchList && latestFromWatchList.length > 0  ?
          <FilmComponent
            image={latestFromWatchList[0].movieInfo.backdrop_path ? latestFromWatchList[0].movieInfo.backdrop_path : latestFromWatchList[0].movieInfo.poster_path}
            rating={latestFromWatchList[0].movieInfo.vote_average * 10}
            title={latestFromWatchList[0].movieInfo.title}
            overview={latestFromWatchList[0].movieInfo.overview}
            release={latestFromWatchList[0].movieInfo.release_date}
            id={latestFromWatchList[0].movieInfo.id}
            source={'watchlist'}
          /> :
          <p>There are no movies on your watchlist.</p>
        }
      </div>
    </div>
  );
};

export default UserProfileComponent;
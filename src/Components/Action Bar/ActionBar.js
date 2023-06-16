import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { AiFillHeart, AiFillStar, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ActionBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite, fetchFavorites } from '../../redux/slices/favoriteSlice';
import { addToWatchList, deleteFromWatchList, fetchWatchList } from '../../redux/slices/watchListSlice';
import RatingComponent from '../UserProfile/NavComponents/RatingComponent/RatingComponent';

const ActionBar = ({ movieId }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.isFavorite[movieId]);
  const isListed = useSelector((state) => state.watchList.isListed[movieId]);
  const userId = useSelector((state) => state.user.id);
  const [showRating, setShowRating] = useState(false);


  const handleToggleFavorite = () => {
    if (userId) {
      if (isFavorite) {
        dispatch(deleteFavorite({ userId, movieId }));
      } else {
        dispatch(addFavorite({ userId, movieId }));
      }
      dispatch(fetchFavorites(userId));
    } else {
      alert('User data has not loaded yet');
    }
  };

  const handleToggleWatchList = () => {
    if (userId) {
      if (isFavorite) {
        dispatch(deleteFromWatchList({ userId, movieId }));
      } else {
        dispatch(addToWatchList({ userId, movieId }));
      }
      dispatch(fetchWatchList(userId));
    } else {
      alert('User data has not loaded yet');
    }
  };

  const handleRateClick = () => {
    setShowRating(!showRating);
  };

  return (
    <div className={styles.actionBar}>
      <div>
        <ActionButton icon={<AiOutlineUnorderedList
          size={30}
          data-tooltip-id="list"
          data-tooltip-content="Add to list"
        />}/>
      </div>
      <div>
        <ActionButton
          onClick={handleToggleFavorite}
          icon={<AiFillHeart
            size={30}
            data-tooltip-id="like"
            data-tooltip-content="Mark as favorite"
            color={isFavorite ? 'red' : null}
          />}/>
      </div>
      <div>
        <ActionButton
          onClick={handleToggleWatchList}
          icon={<BsFillBookmarkFill
            size={25}
            color={isListed ? 'red' : null}
            data-tooltip-id="watchlist"
            data-tooltip-content="Add to yout watchlist"
          />}/>
      </div>
      <div className={styles.ratingButton}>
        <ActionButton
          onClick={handleRateClick}
          className={styles.rating}
          icon={<AiFillStar
            size={30}
            data-tooltip-id="rate"
            data-tooltip-content="Rate it"
          />}/>
        {showRating && <RatingComponent movieId={movieId}/>}
      </div>


      <Tooltip
        id="list"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="like"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="watchlist"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="rate"
        className={styles.tooltip}
        place="bottom"/>
    </div>
  );
};

export default ActionBar;
import React from 'react';
import ActionButton from './ActionButton';
import { AiFillHeart, AiFillStar, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ActionBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite, fetchFavorites } from '../../redux/slices/favoriteSlice';

const ActionBar = ({ movieId }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.isFavorite[movieId]);
  const userId = useSelector((state) => state.user.id);

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

  return (
    <div className={styles.actionBar}>
      <div>
        <ActionButton icon={<AiOutlineUnorderedList
          size={30}
          data-tooltip-id="list"
          data-tooltip-content="Add to list"
        />}/>
        <ActionButton
          onClick={handleToggleFavorite}
          icon={<AiFillHeart
            size={30}
            data-tooltip-id="like"
            data-tooltip-content="Mark as favorite"
            color={isFavorite ? 'red' : null}
          />}/>
        <ActionButton icon={<BsFillBookmarkFill
          size={25}
          data-tooltip-id="watchlist"
          data-tooltip-content="Add to yout watchlist"
        />}/>
        <ActionButton icon={<AiFillStar
          size={30}
          data-tooltip-id="rate"
          data-tooltip-content="Rate it"
        />}/>
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
import React from 'react';
import ActionButton from './ActionButton';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import styles from './ActionBar.module.scss';
import { useSelector } from 'react-redux';
import { createWatchList } from '../../http/watchListAPI';
import { deleteUserWatchList, loadUserWatchList } from '../../redux/backend/watchListBackEndSlice';
import { useMediaQuery } from '@mui/material';

const AddToWatchListBtn = ({ movieId, userId, dispatch }) => {

  const isListed = useSelector((state) => state.watchList.isListed[movieId]);

  const handleToggleWatchList = async () => {
    if (!isListed) {
      createWatchList(userId, movieId)
        .then((data) => {
          dispatch(loadUserWatchList(userId));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(deleteUserWatchList({ movieId, userId }));
    }
  };

  return (
    <>

      <ActionButton
        onClick={handleToggleWatchList}
        icon={<BsFillBookmarkFill
          size={25}
          color={isListed ? 'red' : null}
          data-tooltip-id="watchlist"
          data-tooltip-content="Add to your watchlist"
        />}/>

      <Tooltip
        id="watchlist"
        className={styles.tooltip}
        place="bottom"/>
    </>
  );
};

export default AddToWatchListBtn;
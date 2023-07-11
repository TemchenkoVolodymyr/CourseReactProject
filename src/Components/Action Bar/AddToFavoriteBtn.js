import React from 'react';
import ActionButton from './ActionButton';
import { AiFillHeart } from 'react-icons/ai';
import styles from './ActionBar.module.scss';
import { Tooltip } from 'react-tooltip';
import { useSelector } from 'react-redux';
import { createFavorite } from '../../http/favoriteAPI';
import { deleteUserFavorites, loadUserFavorites } from '../../redux/backend/favoriteBackendSLice';
import { useMediaQuery } from '@mui/material';

const AddToFavoriteBtn = ({ movieId, userId, dispatch }) => {

  const isFavorite = useSelector((state) => state.favorites.isFavorite[movieId]);
  const isMobile = useMediaQuery('(max-width: 767px) ');

  const handleToggleFavorite = async () => {
    if (!isFavorite) {
      createFavorite(userId, movieId)
        .then(() => {
          if(userId){
            dispatch(loadUserFavorites(userId));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(deleteUserFavorites({ movieId, userId }));
    }
  };

  return (
    <>
      <ActionButton
        onClick={handleToggleFavorite}
        icon={<AiFillHeart
          size={isMobile ? 20: 30}
          data-tooltip-id="like"
          data-tooltip-content="Mark as favorite"
          color={isFavorite ? 'red' : null}
        />}/>
      <Tooltip
        id="like"
        className={styles.tooltip}
        place="bottom"/>
    </>
  );
};

export default AddToFavoriteBtn;
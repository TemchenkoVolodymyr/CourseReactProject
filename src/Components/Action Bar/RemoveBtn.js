import React from 'react';
import ActionButton from "./ActionButton";
import {AiOutlineDelete} from "react-icons/ai";
import {deleteUserRating} from "../../redux/backend/ratingBackendSlice";
import {deleteUserWatchList} from "../../redux/backend/watchListBackEndSlice";
import {deleteUserFavorites} from "../../redux/backend/favoriteBackendSLice";

const RemoveBtn = ({movieId, userId, dispatch, source}) => {

  const removeButtonHandle = () => {
    if (userId) {
      if (source === 'favorites') {
        dispatch(deleteUserFavorites({movieId, userId}))
      } else if (source === 'watchlist') {
        dispatch(deleteUserWatchList({movieId, userId}))
      } else if (source === 'ratings') {
        dispatch(deleteUserRating({movieId, userId}))
      }
    } else {
      alert('User data has not loaded yet');
    }
  };

  return (
    <>
      <ActionButton
        onClick={removeButtonHandle}
        icon={<AiOutlineDelete
          size={30}
        />}/>
    </>
  );
};

export default RemoveBtn;
import React from 'react';
import ActionButton from "./ActionButton";
import {AiOutlineDelete} from "react-icons/ai";
import {deleteFavoriteFromDatabase} from "../../http/favoriteAPI";
import {deleteFromWatchList} from "../../redux/slices/watchListSlice";
import {removeRating} from "../../redux/backend/ratingBackendSlice";
import {deleteRatingFromDatabase} from "../../http/ratingAPI";

const RemoveBtn = ({movieId, userId, dispatch, source}) => {


  const removeButtonHandle = () => {
    if (userId) {
      if (source === 'favorites') {
        deleteFavoriteFromDatabase(movieId);
      } else if (source === 'watchlist') {
        dispatch(deleteFromWatchList({ userId, movieId }));
      } else if (source === 'ratings') {
        dispatch(removeRating({ userId, movieId }));
        deleteRatingFromDatabase(movieId);
      }
    } else {
      alert('User data has not loaded yet');
    }
  };

  return (
    <div>
      <ActionButton
        onClick={removeButtonHandle}
        icon={<AiOutlineDelete
          size={30}
        />}/>
    </div>
  );
};

export default RemoveBtn;
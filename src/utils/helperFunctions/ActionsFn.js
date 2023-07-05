import { addFavorite, deleteFavorite, fetchFavorites } from '../../redux/slices/favoriteSlice';
import { addToWatchList, deleteFromWatchList, fetchWatchList } from '../../redux/slices/watchListSlice';
import { addRating } from '../../redux/slices/userRatingsSlice';
import {addToList} from "../../redux/slices/userListsSlice";

export const handleToggleFavorite = async (event, userId, movieId, isFavorite, dispatch) => {
event.preventDefault();
  if (userId) {
    try {
      if (isFavorite) {
        await dispatch(deleteFavorite({ userId, movieId }));
      } else {
        await dispatch(addFavorite({ userId, movieId }));
      }
      await dispatch(fetchFavorites(userId));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
};


export const handleToggleWatchList = async (event, userId, movieId, isListed, dispatch) => {
  event.preventDefault();
  if (userId) {
    try {
      if (isListed) {
        await dispatch(deleteFromWatchList({ userId, movieId }));
      } else {
        await dispatch(addToWatchList({ userId, movieId }));
      }
      await dispatch(fetchWatchList(userId));
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  }
};

export  const handleRatingChanged = (movieId, userId, dispatch, setShowRating, rating) => {
  const movieIdStr = movieId.toString();
  dispatch(addRating({ userId, movieId: movieIdStr, rating }))
    .then(() => {
      setShowRating(false);
    })
    .catch((error) => {
      console.error('Error adding rating:', error);
    });
};


export const handleToggleList = async (event, userId, movieId, dispatch,listName, isInList) => {
  event.preventDefault();
  if (userId) {
    try {
      if (!isInList) {
        await dispatch(addToList({ userId, movieId, listName }));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
};


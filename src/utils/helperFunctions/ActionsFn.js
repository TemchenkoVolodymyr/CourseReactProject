
import { addToWatchList, deleteFromWatchList, fetchWatchList } from '../../redux/slices/watchListSlice';


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



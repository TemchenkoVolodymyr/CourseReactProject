import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ActionBar.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import AddToFavoriteBtn from './AddToFavoriteBtn';
import AddToWatchListBtn from './AddToWatchListBtn';
import RatingBtn from './RatingBtn';
import PlayerBtn from './PlayerBtn';
import RemoveBtn from './RemoveBtn';


const ActionBar = ({movieId, movie, source}) => {
  const {user}= useSelector((state) => state.users);
  const userId = user.id
  const dispatch = useDispatch();

  return (
    <div className={styles.actionBar}>
      { source === 'moviePage' &&
        <>
          <AddToFavoriteBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
          <AddToWatchListBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
          <RatingBtn movieId={movieId}/>
          <PlayerBtn movie={movie}/>
        </>
      }

      { (source === 'ratings' || source === 'favorites' || source === 'watchlist')  &&
        <>
          <RatingBtn movieId={movieId}/>
          <PlayerBtn movie={movie}/>
          <AddToFavoriteBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
          <RemoveBtn movieId={movieId} userId={userId} dispatch={dispatch} source={source}/>
        </>
      }


    </div>
  );
};

export default ActionBar;
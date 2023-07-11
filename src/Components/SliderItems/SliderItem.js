import React from 'react';
import CircleRating from '../Ratings/CircleRating/CircleRating';
import { useDispatch, useSelector } from 'react-redux';
import AddToWatchListBtn from '../Action Bar/AddToWatchListBtn';
import AddToFavoriteBtn from '../Action Bar/AddToFavoriteBtn';
import {useMediaQuery} from "@mui/material";


const SliderItem = ({ img, title, rating, displayAsPercentage, canvasShow, movieId, showActionBadge }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.users.user.id)
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
  <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${img})`}}>
    <div>
      {canvasShow && <CircleRating
        rating={rating}
        displayAsPercentage={displayAsPercentage}
        size={isMobile ? 80 : 60}
      /> }
      {showActionBadge && <>
          <AddToWatchListBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
          <AddToFavoriteBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
      </> }
    </div>

    {title && <p>{title}</p> }

  </div>
  );
};

export default SliderItem;
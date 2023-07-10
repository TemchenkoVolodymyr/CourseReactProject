import React from 'react';
import CircleRating from '../Ratings/CircleRating/CircleRating';
import { useDispatch, useSelector } from 'react-redux';
import AddToWatchListBtn from '../Action Bar/AddToWatchListBtn';
import AddToFavoriteBtn from '../Action Bar/AddToFavoriteBtn';


const SliderItem = ({ img, title, rating, displayAsPercentage, canvasShow, movieId, showActionBadge, windowWidth }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users)
  const userId = user.id

  return (
  <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${img})`}}>
    <div>
      {canvasShow && <CircleRating
        rating={rating}
        displayAsPercentage={displayAsPercentage}
        size={windowWidth >= 360 && windowWidth < 768 ? 80 : 60}
      /> }
      {showActionBadge && <>
        <div>
          <AddToWatchListBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
          <AddToFavoriteBtn movieId={movieId} userId={userId} dispatch={dispatch}/>
        </div>
      </> }
    </div>

    {title && <p>{title}</p> }

  </div>
  );
};

export default SliderItem;
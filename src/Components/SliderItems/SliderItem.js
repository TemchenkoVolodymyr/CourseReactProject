import React from 'react';
import CircleRating from '../CircleRating/CircleRating';
import ActionButton from "../Action Bar/ActionButton";
import {AiFillHeart } from "react-icons/ai";
import {handleToggleFavorite, handleToggleWatchList} from "../../utils/helperFunctions/ActionsFn";
import {useDispatch, useSelector} from "react-redux";
import {BsFillBookmarkFill} from "react-icons/bs";


const SliderItem = ({ img, title, rating, displayAsPercentage, canvasShow, movieId, showActionBadge }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.isFavorite[movieId]);
  const isListed = useSelector((state) => state.watchList.isListed[movieId]);
  const userId = useSelector((state) => state.user.id);

  return (
  <div
    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${img})` }}>
    <div>
      {canvasShow && <CircleRating
        rating={rating}
        displayAsPercentage={displayAsPercentage}
        size={60}
      /> }
      {showActionBadge && <>
        <div>
          <ActionButton
            onClick={(event) => handleToggleWatchList(event, userId, movieId, isListed, dispatch)}
            icon={<BsFillBookmarkFill
              size={20}
              color={isListed ? 'red' : null}
              data-tooltip-id="watchlist"
              data-tooltip-content="Add to your watchlist"
            />}/>
        </div>
        <div>
          <ActionButton
            onClick={(event) => handleToggleFavorite(event, userId, movieId, isFavorite, dispatch)}
            icon={<AiFillHeart
              size={20}
              data-tooltip-id="like"
              data-tooltip-content="Mark as favorite"
              color={isFavorite ? 'red' : null}
            />}/>
        </div>
      </> }
    </div>


    {title && <p>{title}</p> }

  </div>
  );
};

export default SliderItem;
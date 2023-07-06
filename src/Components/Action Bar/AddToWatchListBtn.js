import React from 'react';
import ActionButton from "./ActionButton";
import {handleToggleWatchList} from "../../utils/helperFunctions/ActionsFn";
import {BsFillBookmarkFill} from "react-icons/bs";
import {Tooltip} from "react-tooltip";
import styles from "./ActionBar.module.scss";
import {useSelector} from "react-redux";

const AddToWatchListBtn = ({movieId, userId, dispatch}) => {
  const isListed = useSelector((state) => state.watchList.isListed[movieId]);

  return (
    <div>
      <ActionButton
        onClick={(event) => handleToggleWatchList(event, userId, movieId, isListed, dispatch)}
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
    </div>
  );
};

export default AddToWatchListBtn;
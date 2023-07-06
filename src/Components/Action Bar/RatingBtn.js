import React, {useState} from 'react';
import styles from "./ActionBar.module.scss";
import ActionButton from "./ActionButton";
import {AiFillStar} from "react-icons/ai";
import RatingComponent from "../Ratings/RatingComponent/RatingComponent";
import {Tooltip} from "react-tooltip";
import {useSelector} from "react-redux";

const RatingBtn = ({movieId}) => {
  const isRated = useSelector((state) => state.ratings.isRated[movieId]);
  const [showRating, setShowRating] = useState(false);
  const handleRateClick = () => {
    setShowRating(!showRating);
  };
  return (
    <div className={styles.ratingButton}>
      <ActionButton
        onClick={handleRateClick}
        className={styles.rating}
        icon={<AiFillStar
          size={30}
          color={isRated ? 'yellow' : null}
          data-tooltip-id="rate"
          data-tooltip-content="Rate it"
        />}/>
      {showRating && <RatingComponent movieId={movieId} setShowRating={setShowRating}/>}
      <Tooltip
        id="rate"
        className={styles.tooltip}
        place="bottom"/>
    </div>
  );
};

export default RatingBtn;
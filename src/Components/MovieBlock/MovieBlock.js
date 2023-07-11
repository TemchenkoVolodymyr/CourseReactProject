import React from 'react';
import styles from './MovieBlock.module.scss';
import CircleRating from '../Ratings/CircleRating/CircleRating';

const MovieBlock = ({ image, title, rating, displayAsPercentage, canvasShow }) => {

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${image})` }}>
      {canvasShow ?  <CircleRating
        rating={rating}
        displayAsPercentage={displayAsPercentage}
        size={60}/> : null
      }
      <p>{title}</p>
    </div>
  );
};

export default MovieBlock;
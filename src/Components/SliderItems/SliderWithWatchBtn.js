import React from 'react';
import CircleRating from '../Ratings/CircleRating/CircleRating';
import { useNavigate } from 'react-router';
import styles from '../Button/CustomButton.module.scss';
import {useMediaQuery} from "@mui/material";

const SliderWithWatchBtn = ({ name, category, id, bg, rating, displayAsPercentage }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const watchOnClickHandler = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), 
        rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${bg})`
      }}>
      <div>
        <CircleRating
            rating={rating}
            displayAsPercentage={displayAsPercentage}
            size={isMobile ?  80 : 90}/>
      </div>
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <button
          className={styles.link}
          onClick={watchOnClickHandler}>
          Watch
        </button>
      </div>
    </div>
  );
};

export default SliderWithWatchBtn;

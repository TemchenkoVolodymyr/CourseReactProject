import React from 'react';
import style from '../../pages/MoviePage/MoviePage.module.scss';
import CircleRating from '../Ratings/CircleRating/CircleRating';
import {useMediaQuery} from "@mui/material";

const OverviewSection = ({ movie }) => {

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <section className={style.overview}>
      <div className={style.rating}>
        <p>User Score</p>
        <CircleRating
            rating={movie.vote_average.toFixed(2) * 10}
            size={isMobile ? 80 : 100}
            displayAsPercentage={true}
          />
      </div>
    </section>
  );
};

export default OverviewSection;
import React from 'react';
import CircleRating from '../CircleRating/CircleRating';
import CustomButton from '../Button/CustomButton';

const SliderWithWatchBtn = ({ name, category, id, bg, rating, displayAsPercentage }) => {

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), 
        rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${bg})` }}>
      <div className="userScore">
        <p>User Score</p>
        <CircleRating
          rating={rating}
          displayAsPercentage={displayAsPercentage}
          size={100}/>
      </div>
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <CustomButton name={'Watch'} path={`/movie/${id}`} ></CustomButton>
      </div>
    </div>
  );
};

export default SliderWithWatchBtn;
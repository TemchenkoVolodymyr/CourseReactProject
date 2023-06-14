import React from 'react';

import CircleRating from '../CircleRating/CircleRating';
import Button from '../Button/Button';

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
        {/*<button onClick={handleClick}>Watch</button>*/}
        <Button name={'Watch'} path={`/movie/${id}`} ></Button>
      </div>
    </div>
  );
};

export default SliderWithWatchBtn;

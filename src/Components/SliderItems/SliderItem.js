import React from 'react';
import CircleRating from "../CircleRating/CircleRating";


const SliderItem = ({img, title, rating, displayAsPercentage}) => {

  return (
  <div
    style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300${img})`}}>
    <CircleRating
      rating={rating}
      displayAsPercentage={displayAsPercentage}
      size={60}/>
    <p>{title}</p>

  </div>
  );
};

export default SliderItem;
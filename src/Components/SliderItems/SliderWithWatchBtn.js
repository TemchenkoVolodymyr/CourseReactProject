import React from 'react';
import {useNavigate} from 'react-router';
import CircleRating from '../CircleRating/CircleRating';

const SliderWithWatchBtn = ({name, category, id, bg, rating, displayAsPercentage}) => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/${id}`);
  }
  return (
    <div
      style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${bg})`}}>
      <div className='userScore'>
        <p>User Score</p>
        <CircleRating
          rating={rating}
          displayAsPercentage={displayAsPercentage}
          size={100}/>
      </div>
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <button onClick={handleClick}>Watch</button>
      </div>
    </div>
  );
};

export default SliderWithWatchBtn;

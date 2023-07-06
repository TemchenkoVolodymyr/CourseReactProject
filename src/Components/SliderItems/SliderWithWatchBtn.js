import React, { useEffect, useState } from 'react';
import CircleRating from '../Ratings/CircleRating/CircleRating';
import { useNavigate } from 'react-router';
import styles from '../Button/CustomButton.module.scss';

const SliderWithWatchBtn = ({ name, category, id, bg, rating, displayAsPercentage }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const watchOnClickHandler = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), 
        rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${bg})`
      }}>
      <div className="userScore">
        <p>User Score</p>
        {windowWidth >= 360 && windowWidth < 600 ? <CircleRating
            rating={rating}
            displayAsPercentage={displayAsPercentage}
            size={60}/> :
          <CircleRating
            rating={rating}
            displayAsPercentage={displayAsPercentage}
            size={100}/>}
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

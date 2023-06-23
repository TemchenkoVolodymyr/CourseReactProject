import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import styles from './RatingComponent.module.scss';
import { useSelector } from 'react-redux';


const RatingComponent = ({ movieId, onChange }) => {

  const ratings = useSelector((state) => state.ratings.ratings);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const userRatingForThisMovie = ratings.find(
    (rating) => rating.movieId === movieId.toString()
  )?.rating || 0;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () =>  window.addEventListener('resize', handleResize);
  });

  return (
    <div className={styles.stars}>
      {windowWidth >= 360 && windowWidth < 768 ?  <ReactStars
          count={5}
          onChange={onChange}
          value={userRatingForThisMovie}
          size={25}
          isHalf={true}
          emptyIcon={<i className="far fa-star" style={{ color: 'white' }}></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        /> :
          <ReactStars
            count={5}
            onChange={onChange}
            value={userRatingForThisMovie}
            size={44}
            isHalf={true}
            emptyIcon={<i className="far fa-star" style={{ color: 'white' }}></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          /> }

    </div>
  );
};

export default RatingComponent;
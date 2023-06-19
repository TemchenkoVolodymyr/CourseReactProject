import React from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import styles from './RatingComponent.module.scss';
import { useSelector } from 'react-redux';


const RatingComponent = ({ movieId, onChange }) => {

  const ratings = useSelector((state) => state.ratings.ratings);


  const userRatingForThisMovie = ratings.find(
    (rating) => rating.movieId === movieId.toString()
  )?.rating || 0;

  return (
    <div className={styles.stars}>
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
          />

    </div>
  );
};

export default RatingComponent;
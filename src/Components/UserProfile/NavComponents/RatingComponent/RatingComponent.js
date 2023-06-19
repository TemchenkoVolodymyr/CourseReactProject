import React from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import styles from './RatingComponent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addRating } from '../../../../redux/slices/userRatingsSlice';

const RatingComponent = ({ movieId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const ratings = useSelector((state) => state.ratings.ratings);

  const userRatingForThisMovie = ratings.find(
    (rating) => rating.movieId === movieId.toString()
  )?.rating || 0;


  const ratingChanged = (rating) => {
    const movieIdStr = movieId.toString();
    dispatch(addRating({ userId, movieId: movieIdStr, rating }));
  };

  return (
    <div className={styles.stars}>
      <ReactStars
        count={5}
        onChange={ratingChanged}
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
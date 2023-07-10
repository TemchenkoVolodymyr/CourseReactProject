import React from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import styles from './RatingComponent.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {createRating} from "../../../http/ratingAPI";
import {loadUserRatings} from "../../../redux/backend/ratingBackendSlice";


const RatingComponent = ({movieId, setShowRating}) => {
  const dispatch = useDispatch()
  const {ratings} = useSelector((state) => state.ratings);
  const userId = useSelector(state => state.users.user.id)

  const userRatingForThisMovie = ratings?.find(
    (rating) => parseInt(rating.movieId) === parseInt(movieId)
  )?.rate || 0;

  const handleRatingChange = (rate) => {
    createRating(userId, movieId, rate)
      .then((data) => {
        dispatch(loadUserRatings(userId));
      })
      .catch((error) => {
        console.log(error)
      });

    setShowRating(false)
  };


  return (
    <div className={styles.stars}>
      <ReactStars
        count={5}
        onChange={handleRatingChange}
        value={userRatingForThisMovie}
        size={45}
        isHalf={true}
        emptyIcon={<i className="far fa-star" style={{color: 'white'}}></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default RatingComponent;
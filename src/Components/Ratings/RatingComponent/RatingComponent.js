import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import styles from './RatingComponent.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {createRating} from "../../../http/ratingAPI";
import {loadUserRatings} from "../../../redux/backend/ratingBackendSlice";


const RatingComponent = ({ movieId, setShowRating }) => {
const dispatch = useDispatch()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {ratings}  = useSelector((state) => state.ratings);
  const {user} = useSelector(state => state.users)

  const userId = user.id

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
          onChange={handleRatingChange}
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
          onChange={handleRatingChange}
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
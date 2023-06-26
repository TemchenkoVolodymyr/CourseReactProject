import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserReviews} from '../../../redux/slices/userReviewsSlice';
import {useAuth} from '../../../hooks/useAuth';
import styles from '../UserProfile.module.scss'

const UserReviews = () => {
  const dispatch = useDispatch()
  const userReviews = useSelector((state) => state.userReviews.userReviews)
  const { email } = useAuth()

  useEffect(() => {
    dispatch(fetchUserReviews(email));
  }, [])

  return (
    <div className={styles.reviews}>
      {userReviews?.map((review) =>
        <div key={review.id} className={styles.block}>
            <div>
              <img src={`https://image.tmdb.org/t/p/original${review.movieInfo.backdrop_path}`} alt=""/>
            </div>
             <div className={styles.reviews}>
               <p>{review.text}</p>
               <p>{review.date}</p>
             </div>
        </div>)}
    </div>
  );
};

export default UserReviews;
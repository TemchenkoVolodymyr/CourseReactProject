import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserReviews} from '../../../redux/slices/userReviewsSlice';
import {useAuth} from '../../../hooks/useAuth';
import styles from '../UserProfile.module.scss';
import ReviewActionsComponent from "../ReviewActionsComponent";

const UserReviews = () => {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.userReviews.userReviews);
  const {email} = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserReviews(email));
  }, [])

  return (
    <div className={styles.wrapper}>
      {userReviews?.map((review) =>
        <div key={review.id} className={styles.block}>
            <img
              src={`https://image.tmdb.org/t/p/original${review.movieInfo.backdrop_path}`}
              alt={review.movieInfo.title}/>
          <ReviewActionsComponent review={review}/>
        </div>)}
    </div>
  );
};

export default UserReviews;
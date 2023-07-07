import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../UserProfile.module.scss';
import ReviewActionsComponent from "../ReviewActionsComponent";
import {loadUserReviews} from "../../../redux/backend/reviewBackendSlice";
import NoInfoComponent from "./NoInfoComponent";

const UserReviews = () => {
  const dispatch = useDispatch();
  const {userReviews, userReviewsLoading, userReviewsError} = useSelector((state) => state.reviews);
  const userId = useSelector((state) => state.users.user.id);

  useEffect(() => {
    dispatch(loadUserReviews(userId));
  }, [userId])

  return (
<section className={styles.pageInfo}>
    <div className={styles.wrapper}>
      {userReviewsLoading && <p>...loading</p>}
      {userReviews.length === 0 && <NoInfoComponent review="ratings"/>}
      {userReviews?.map((review) =>
        <div key={review.id} className={styles.block}>
            <img
              src={`https://image.tmdb.org/t/p/original${review.movieInfo.backdrop_path}`}
              alt={review.movieInfo.title}/>
          <ReviewActionsComponent review={review}/>
        </div>)}
      {userReviewsError && <p>{userReviewsError}</p>}
    </div>
</section>
  );
};

export default UserReviews;
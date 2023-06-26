import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserReviews, fetchUserReviews} from '../../../redux/slices/userReviewsSlice';
import {useAuth} from '../../../hooks/useAuth';
import styles from '../UserProfile.module.scss';
import {BiEdit} from 'react-icons/bi';
import {CiSquareRemove} from 'react-icons/ci';

const UserReviews = () => {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.userReviews.userReviews);
  const { email } = useAuth();

  useEffect(() => {
    dispatch(fetchUserReviews(email));
  }, [])
  console.log(userReviews);
  const removeRevieHandler = (reviewId, movieId) => {
    dispatch(deleteUserReviews(reviewId, movieId))
  }

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
          <div className={styles.actions}>
           <BiEdit size={30}/>
            <CiSquareRemove size={30} onClick={()=> removeRevieHandler({reviewId: review.id, movieId: review.movieId})} />
          </div>
        </div>)}
    </div>
  );
};

export default UserReviews;
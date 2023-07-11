import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiSquareRemove } from 'react-icons/ci';
import { BiEdit } from 'react-icons/bi';
import { RiSave3Fill } from 'react-icons/ri';
import styles from './UserProfile.module.scss';
import { deleteUserReviews, loadUserReviews, updateUsersReviews } from '../../redux/backend/reviewBackendSlice';

const ReviewActionsComponent = ({ review }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [text, setText] = useState('');
  const userId= useSelector((state) => state.users.user.id);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUsersReviews(
      {
        reviewId: review.id,
        userId,
        movieId: review.movieId,
        text: editText
      }))
      .then(() => dispatch(loadUserReviews(userId)))
      .catch((error) => console.error('Error updating user reviews:', error));
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditText(event.target.value);
    setText(event.target.value);
  };

  const removeReviewHandler = () => {
    const reviewId = review.id;
    dispatch(deleteUserReviews( reviewId));
  };

  return (
    <div className={styles.reviews}>
        {isEditing ? (
          <>
            <div className={styles.review}>
              <textarea
                value={editText}
                maxLength="200"
                onChange={handleChange}/>

              {text.length >= 200 ?
                <p><span>{text.length}</span>/200</p> : <p>{text.length}/200</p>
              }

            </div>

            <RiSave3Fill
              onClick={handleSaveClick}
              size={30}
              style={{ cursor: 'pointer' }}
              color={'#1d891d91'}
            />
          </>
        ) : (
          <>
            <div className={styles.review}>
              <p>{review.text}</p>
              <p>{new Date(review.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <BiEdit
              onClick={handleEditClick}
              size={30}
              style={{ cursor: 'pointer' }}
            />
          </>
        )}

      <CiSquareRemove
        onClick={removeReviewHandler}
        size={30}
        style={{ cursor: 'pointer' }}
        color={'rgba(152, 4, 4, 0.9)'}/>
    </div>
  );
};

export default ReviewActionsComponent;
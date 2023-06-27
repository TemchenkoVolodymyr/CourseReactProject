import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {deleteUserReviews, updateUserReview} from "../../redux/slices/userReviewsSlice";
import {CiSquareRemove} from "react-icons/ci";
import {BiEdit} from "react-icons/bi";
import {RiSave3Fill} from "react-icons/ri";
import styles from "./UserProfile.module.scss";

const ReviewActionsComponent = ({review}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [text, setText] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString()
    dispatch(updateUserReview({reviewId: review.id, movieId: review.movieId, updatedText: editText, updatedDate: formattedDate }));
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditText(event.target.value);
    setText(event.target.value);
  };

  const removeReviewHandler = (reviewId, movieId) => {
    dispatch(deleteUserReviews(reviewId, movieId))
  }

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
              style={{cursor: 'pointer'}}
              color={'#1d891d91'}
            />
          </>
        ) : (
          <>
            <div className={styles.review}>
              <p>{review.text}</p>
              <p>{review.date}</p>
            </div>

            <BiEdit
              onClick={handleEditClick}
              size={30}
              style={{cursor: 'pointer'}}
            />
          </>
        )}

      <CiSquareRemove
        onClick={() => removeReviewHandler({reviewId: review.id, movieId: review.movieId})}
        size={30}
        style={{cursor: 'pointer'}}
        color={'rgba(152, 4, 4, 0.9)'}/>
    </div>
  );
};

export default ReviewActionsComponent;
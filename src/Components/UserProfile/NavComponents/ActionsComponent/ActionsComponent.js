import React from 'react';
import ActionButton from '../../../Action Bar/ActionButton';
import { AiFillHeart, AiFillStar, AiOutlineDelete, AiOutlineUnorderedList } from 'react-icons/ai';
import styles from '../../UserProfile.module.scss';
import { db } from '../../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { removeFavorite } from '../../../../redux/slices/favoriteSlice';

const ActionsComponent = ({ movieId , removeFromFavorites }) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const removeCollectionByMovieId = async (movieId) => {

    const collectionRef = collection(db, `users/${userId}/favorites`);
    const queryRef = query(collectionRef, where('movieId', '==', movieId));
    const snapshot = await getDocs(queryRef);

    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    dispatch(removeFavorite(movieId));
    console.log('Collection removed for movieId:', movieId);

    removeFromFavorites(movieId);
  };

  const removeFromFavoriteHandle = async () => {
    try {
      await removeCollectionByMovieId(movieId);
    } catch (error) {
      console.error('Error removing collection for movieId:', error);
    }
  };


  return (

    <div className={styles.actionBar}>
      <div>
        <ActionButton icon={<AiFillStar
          size={30}
        />}/>
        <p>Rate It</p>
      </div>
      <div>
        <ActionButton icon={<AiOutlineUnorderedList
          size={30}
        />}/>
        <p>Add to List</p>
      </div>
      <div>
        <ActionButton
          icon={<AiFillHeart
            size={30}
          />}/>
        <p>Favorite</p>
      </div>
      <div>
        <ActionButton
          onClick={removeFromFavoriteHandle}
          icon={<AiOutlineDelete
            size={30}
          />}/>
        <p>Remove</p>
      </div>

    </div>
  );
};

export default ActionsComponent;
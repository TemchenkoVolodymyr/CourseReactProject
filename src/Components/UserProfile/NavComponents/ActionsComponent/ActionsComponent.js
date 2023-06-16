import React from 'react';
import ActionButton from '../../../Action Bar/ActionButton';
import {AiFillHeart, AiFillStar, AiOutlineDelete, AiOutlineUnorderedList} from 'react-icons/ai';
import styles from '../../UserProfile.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFavorite} from '../../../../redux/slices/favoriteSlice';

const ActionsComponent = ({movieId}) => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.isFavorite[movieId])

  const removeFromFavoriteHandle = () => {
    if (userId) {
      dispatch(deleteFavorite({ userId, movieId }));

    } else {
      alert('User data has not loaded yet');
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
          onClick={removeFromFavoriteHandle}
          icon={<AiFillHeart
            size={30}
            color={isFavorite ? 'red' : null}
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
import React from 'react';
import styles from '../UserProfile.module.scss';
import { FaRegSadCry } from 'react-icons/fa';

const NoInfoComponent = ({ review }) => {
  return (
    <div className={styles.emptyList}>
      <FaRegSadCry size={50} color="#215064"/>
      {review === 'ratings' ? <p> No reviews found</p> :
        <p> No movies found. Start adding your favorite films to the list!</p>}

    </div>


  );
};

export default NoInfoComponent;
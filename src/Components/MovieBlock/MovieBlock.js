import React from 'react';
import styles from './MovieBlock.module.scss'

const MovieBlock = ({image, title}) => {

  return (
    <div
      className={styles.wrapper}
      style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${image})`}}>
      <p>{title}</p>
    </div>
  );
};

export default MovieBlock;
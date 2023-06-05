import React from 'react';
import styles from './PageBlock.module.scss'

const PageBlock = ({image, title}) => {

  return (
    <div
      className={styles.wrapper}
      style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${image})`}}>
      <p>{title}</p>
   </div>
  );
};

export default PageBlock;
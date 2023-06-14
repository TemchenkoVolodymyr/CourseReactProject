import React from 'react';
import styles from './ActionButton.module.scss';

const ActionButton = ({ icon }) => {
  return (
    <button className={styles.actionButton}>
      <span className="icon">{icon}</span>
    </button>
  );
};
 export default ActionButton;
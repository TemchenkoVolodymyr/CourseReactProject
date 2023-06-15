import React from 'react';
import styles from './ActionButton.module.scss';

const ActionButton = ({ icon, onClick }) => {
  return (

      <button
        onClick={onClick}
        className={styles.actionButton}>
        <span className="icon">{icon}</span>
      </button>

  );
};
 export default ActionButton;
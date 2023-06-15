import React from 'react';
import ActionButton from './ActionButton';
import {AiFillHeart, AiFillStar, AiOutlineUnorderedList} from 'react-icons/ai';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ActionBar.module.scss'


const ActionBar = () => {

  return (
    <div className={styles.actionBar}>
      <div>
        <ActionButton icon={<AiOutlineUnorderedList
          size={30}
          data-tooltip-id="list"
          data-tooltip-content="Add to list"
        />}/>
        <ActionButton icon={<AiFillHeart
          size={30}
          data-tooltip-id="like"
          data-tooltip-content="Mark as favorite"
        />}/>
        <ActionButton icon={<BsFillBookmarkFill
          size={25}
          data-tooltip-id="watchlist"
          data-tooltip-content="Add to yout watchlist"
        />}/>
        <ActionButton icon={<AiFillStar
          size={30}
          data-tooltip-id="rate"
          data-tooltip-content="Rate it"
        />}/>
      </div>
      <Tooltip
        id="list"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="like"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="watchlist"
        className={styles.tooltip}
        place="bottom"/>
      <Tooltip
        id="rate"
        className={styles.tooltip}
        place="bottom"/>
    </div>
  );
};

export default ActionBar;
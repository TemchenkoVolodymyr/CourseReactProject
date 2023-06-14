import React from 'react';
import ActionButton from './ActionButton';
import {AiFillHeart, AiFillStar, AiOutlineUnorderedList} from 'react-icons/ai';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './ActionBar.module.scss'


const ActionBar = () => {

  return (
    <>
      <ActionButton icon={<AiOutlineUnorderedList
        size={30}
        data-tooltip-id="list"
        data-tooltip-content="Add to list"
        data-tooltip-place="right"
      />}/>
      <ActionButton icon={<AiFillHeart
        size={30}
        data-tooltip-id="like"
        data-tooltip-content="Mark as favorite"
        data-tooltip-place="right"
      />}/>
      <ActionButton icon={<BsFillBookmarkFill
        size={25}
        data-tooltip-id="watchlist"
        data-tooltip-content="Add to yout watchlist"
        data-tooltip-place="right"
      />}/>
      <ActionButton icon={<AiFillStar
        size={30}
        data-tooltip-id="rate"
        data-tooltip-content="Rate it"
        data-tooltip-place="right"
      />}/>
      <Tooltip
        id="list"
        className={styles.tooltip}/>
      <Tooltip
        id="like"
        className={styles.tooltip}/>
      <Tooltip
        id="watchlist"
        className={styles.tooltip}/>
      <Tooltip
        id="rate"
        className={styles.tooltip}/>
    </>
  );
};

export default ActionBar;
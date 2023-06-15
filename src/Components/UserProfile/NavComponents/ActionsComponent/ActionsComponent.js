import React from 'react';
import ActionButton from "../../../Action Bar/ActionButton";
import {AiFillHeart, AiFillStar, AiOutlineUnorderedList} from "react-icons/ai";
import {BsFillBookmarkFill} from "react-icons/bs";
import styles from '../../UserProfile.module.scss'

const ActionsComponent = () => {
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
          <ActionButton icon={<BsFillBookmarkFill
            size={25}
          />}/>
          <p>Remove</p>
        </div>

      </div>
  );
};

export default ActionsComponent;
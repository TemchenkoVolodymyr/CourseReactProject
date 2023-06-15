import React from 'react';
import ActionButton from "../../../Action Bar/ActionButton";
import {AiFillHeart, AiFillStar, AiOutlineUnorderedList} from "react-icons/ai";
import styles from '../../UserProfile.module.scss'

import {MdOutlinePlaylistRemove} from "react-icons/md";

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
          <ActionButton icon={<MdOutlinePlaylistRemove
            size={30}
          />}/>
          <p>Remove</p>
        </div>

      </div>
  );
};

export default ActionsComponent;
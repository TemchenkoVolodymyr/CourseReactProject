import React from 'react';
import ActionButton from "./ActionButton";
import {AiOutlineUnorderedList} from "react-icons/ai";
import styles from "./ActionBar.module.scss";
import {Tooltip} from "react-tooltip";

const AddToListBtn = () => {
  return (
    <div>
      <ActionButton
        icon={<AiOutlineUnorderedList
          size={30}
          data-tooltip-id="list"
          data-tooltip-content="Add to list"
        />}/>
      <Tooltip
        id="list"
        className={styles.tooltip}
        place="bottom"/>
    </div>
  );
};

export default AddToListBtn;
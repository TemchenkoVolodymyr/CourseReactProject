import React, {useState} from 'react';
import ActionButton from "./ActionButton";
import {AiOutlinePlaySquare} from "react-icons/ai";
import MoviePlayerModal from "../MoviePlayerModal/MoviePlayerModal";
import {Tooltip} from "react-tooltip";
import styles from "./ActionBar.module.scss";

const PlayerBtn = ({movie}) => {

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const handlePlayerClick = () => {
    setIsPlayerOpen(!isPlayerOpen);
  };

  return (
    <>
      <ActionButton
        onClick={handlePlayerClick}
        icon={<AiOutlinePlaySquare
          size={25}
          color={isPlayerOpen ? 'red' : null}
          data-tooltip-id="player"
          data-tooltip-content="Watch the trailer"
        />}/>
      {isPlayerOpen && <MoviePlayerModal
        movie={movie}
        isPlayerOpen={isPlayerOpen}
        setIsPlayerOpen={setIsPlayerOpen}
      />}

      <Tooltip
        id="player"
        className={styles.tooltip}
        place="bottom"/>
    </>
  );
};

export default PlayerBtn;
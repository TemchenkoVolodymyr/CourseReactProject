import React from 'react';
import {useNavigate} from "react-router";
import styles from "./CardVideo.module.scss"

const CardVideo = (props) => {

  const urlImg = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";

  const navigate = useNavigate();

  const {description, sources, subtitle, thumb, title} = props;

  return (
    <div className={styles.cardVideo}>
      <div className={styles.wrapVideo}>
        <img className={styles.thumbVideo} src={`${urlImg + thumb}`} alt={title} title={description}/>
        <h2 className={styles.titleVideo}>{title}</h2>
        <h3 className={styles.subtitleVideo}>{subtitle}</h3>
      </div>
    </div>
  );
};

export default CardVideo;
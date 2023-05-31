import React from 'react';
import {useNavigate} from "react-router";

const CardVideo = (props) => {

  const urlImg = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";

  const navigate = useNavigate();

  const {description, sources, subtitle, thumb, title} = props;

  return (
    <div className={"cardVideo"}>
      CardVideo
      <div className={"wrapVideo"}>
        <img className={"thumbVideo"} src={`${urlImg + thumb}`} alt={title} title={description}/>
        <h2 className={"titleVideo"}>{title}</h2>
        <h3 className={"subtitleVideo"}>{subtitle}</h3>
      </div>
    </div>
  );
};

export default CardVideo;
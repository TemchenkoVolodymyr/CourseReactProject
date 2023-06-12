import React from 'react';
import style from "./AdminPanelStatistics.module.scss";

const Statistic = (props) => {

  let {title, description, image} = props
  return (
    <>
      <div className={style.wrapperBox}>
        <div className={style.box}>
          <h3>{title}</h3>
          <p>{description}</p>
          {image && <img src={image} alt="most popular movie"/>}
        </div>
      </div>
    </>
  );
};

export default Statistic;
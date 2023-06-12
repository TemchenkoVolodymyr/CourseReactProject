import React from 'react';
import  style from "./TrendingMovies.module.scss"

const TrendingMovies = (props) => {
  return (
    <div className={style.container}>
      <div className={style.images} style={{backgroundImage:`url(${props.image})`}}></div>
    </div>
  );
};

export default TrendingMovies;
import React from 'react';
import  style from  "./TrendingMovies.module.scss"

const TrendingMovies = (props) => {

    let styleImage = {backgroundImage:`url(${props.image})`}

  return (
    <div className={style.container}>
      <div className={style.images} style={styleImage}></div>
    </div>
  );
};

export default TrendingMovies;
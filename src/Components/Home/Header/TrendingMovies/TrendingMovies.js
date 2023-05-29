import React from 'react';
import  style from  "./TrendingMovies.module.scss"

const TrendingMovies = (props) => {
  return (
    <div >
      <img className={style.image} src={props.image} alt="trending movies" />
    </div>
  );
};

export default TrendingMovies;
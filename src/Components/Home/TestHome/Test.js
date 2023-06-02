import React from 'react';

const Test = ({img, title}) => {

  const imageBaseUrl = 'https://image.tmdb.org/t/p/'
  return (
  <div
    style={{backgroundImage: `url(${imageBaseUrl}w500${img})`}}>
    <p>{title}</p>
    {/*<p>{actor.countOfFilms}</p>*/}
  </div>
  );
};

export default Test;
import React from 'react';
import  "./ItemCarousel.scss"

const ItemCarousel = (props) => {

  let {name,category,styleName} = props

  return (
    <div className={`item ${styleName}`}>
      <h3>{name}</h3>
      <h4>{category}</h4>
      <button>Watch</button>
    </div>
  );
};

export default ItemCarousel;
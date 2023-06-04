import React from 'react';
import {Link} from "react-router-dom";

const ItemCarousel = (props) => {

  let {name,category,id, bg} = props

  return (
    <div style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/w500${bg})`}} >
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <button><Link to={`/${id}`}>Watch</Link></button>
      </div>
    </div>
  );
};

export default ItemCarousel;

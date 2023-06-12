import React from 'react';
import {useNavigate} from "react-router";

const ItemCarousel = (props) => {

  const navigate = useNavigate()
  let {name, category, id, bg} = props
  const handleClick = () => {
    navigate(`/${id}`);
  }
  return (
    <div
      style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/w500${bg})`}}>
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <button onClick={handleClick}>Watch</button>
      </div>
    </div>
  );
};

export default ItemCarousel;

import React from 'react';
import style from  "./ItemCarousel.module.scss"

const ItemCarousel = (props) => {

  let {name,category} = props

  let url = props.bg

  return (
    <div style={{backgroundImage:`url(${url})`}} className={style.item }>
      <h2 className={style.name}>{name}</h2>
      <h4 className={style.category}>{category}</h4>
      <button className={style.button}>Watch</button>
    </div>
  );
};

export default ItemCarousel;

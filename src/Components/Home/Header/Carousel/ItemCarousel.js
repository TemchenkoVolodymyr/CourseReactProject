import React from 'react';
import style from  "./ItemCarousel.module.scss"
import CustomLink from "../../../../router/CustomLink/CustomLink";

const ItemCarousel = (props) => {

  let {name,category,id} = props


  let url = props.bg

  return (
    <div style={{backgroundImage:`url(${url})`}} className={style.item }>
      <h2 className={style.name}>{name}</h2>
      <h4 className={style.category}>{category}</h4>
      <CustomLink to={`/${id}`}>Watch</CustomLink>

    </div>
  );
};

export default ItemCarousel;

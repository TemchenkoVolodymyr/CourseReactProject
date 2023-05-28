import React, {Children, cloneElement, useEffect, useState} from 'react';
import style from "./Carousel.module.scss"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const Carousel = ({children}) => {

  const [pages, setPages] = useState([])
  const [offset, setOffset] = useState(0)


  const handleRightClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset + 420
      console.log(currentOffset)
      return Math.min(newOffset,0)
  }
    )}

  const handleLeftClick = () => {
    console.log('a')
    setOffset((currentOffset) => {
      const newOffset = currentOffset - 420
      const maxOffset = -(420 * (children.length -1))

      return Math.max(newOffset,maxOffset)
    })
  }


  return (
    <div className={style.container}>
      <FaChevronLeft className={style.arrow} onClick={handleLeftClick}></FaChevronLeft>

      <div className={style.window}>
        <div className={style.items} style={{transform:`translateX(${offset}px)`}}>
          {children}
        </div>
      </div>
      <FaChevronRight className={style.arrow} onClick={handleRightClick}></FaChevronRight>

    </div>
  );
};

export default Carousel;
import React, {Children, cloneElement, useEffect, useState} from 'react';
import style from "./Carousel.module.scss"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const Carousel = ({children}) => {

  let widthItem = 870

  const [pages, setPages] = useState([])
  const [offset, setOffset] = useState(0)


  const handleRightClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset + widthItem

        return Math.min(newOffset, 0)
      }
    )
  }

  const handleLeftClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - widthItem
      const maxOffset = -(widthItem * (children.length - 1))

      return Math.max(newOffset, maxOffset)
    })
  }


  return (
    <div className={style.container}>
      <FaChevronLeft className={style.arrow} onClick={handleLeftClick}></FaChevronLeft>

      <div className={style.window}>
        <div className={style.items} style={{transform: `translateX(${offset}px)`}}>
          {children}
        </div>
      </div>
      <FaChevronRight className={style.arrow} onClick={handleRightClick}></FaChevronRight>

    </div>
  );
};

export default Carousel;
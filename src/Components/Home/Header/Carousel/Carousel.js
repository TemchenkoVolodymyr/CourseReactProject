import React, {useState} from 'react';
import style from "./Carousel.module.scss"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";


const Carousel = ({children, ...props}) => {

  let {widthBox, styleCss} = props

  const [offset, setOffset] = useState(0)


  const handleRightClick = () => {
    setOffset((currentOffset) => {
        const newOffset = currentOffset - widthBox
        const maxOffset = -(widthBox * (children.length - 1))


        let result = Math.max(newOffset, maxOffset)
        if (result === Number(-1169)) {  // я не смог тут сделать без хард кода , думаю можно будет потом зарефакторить , это что бы в section Trending now слайдер когда доходил на крайней правей картинки останавливался
          return currentOffset
        }

        return result
      }
    )
  }

  const handleLeftClick = () => {
    setOffset((currentOffset) => {
      const newOffset = +currentOffset + +widthBox
      return Math.min(newOffset, 0)
    })
  }

  return (
    <div style={styleCss.container}>
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
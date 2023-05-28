import React, {Children, cloneElement, useEffect, useState} from 'react';
import style from "./Carousel.module.scss"
import {FaChevronLeft} from "react-icons/fa";

const Carousel = ({children}) => {

  const [pages, setPages] = useState([])

  // useEffect(() => {
  //   setPages(
  //     Children.map(children,(child) => {
  //       console.log(child)
  //       return cloneElement(child,{
  //         style:{
  //           height:"100%",
  //           minWidth:"100%",
  //           maxWidth:"100%"
  //         },
  //       })
  //     })
  //   )
  // }, [])

  return (
    <div className={style.container}>
      <FaChevronLeft></FaChevronLeft>
      <div className={style.window}>
        <div className={style.items}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default Carousel;
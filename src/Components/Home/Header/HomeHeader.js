import React from 'react';
import style from "./HomeHeader.module.scss"
import Carousel from "./Carousel/Carousel";
import ItemCarousel from "./Carousel/ItemCarousel";


const HomeHeader = () => {
  return (

    <Carousel>
      <ItemCarousel name={"ENCANTO"} category={"Cartoons Comedy"} styleName={"item-1"}/>
      <ItemCarousel name={"Film 2"} category={"Affff"} styleName={"item-2"}/>
      <ItemCarousel name={"Film 3"} category={"ADssss"} styleName={"item-3"}/>
    </Carousel>


  );
};

export default HomeHeader;
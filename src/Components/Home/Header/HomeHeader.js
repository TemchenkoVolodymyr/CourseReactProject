import React from 'react';
import style from "./HomeHeader.module.scss"
import Carousel from "./Carousel/Carousel";
import ItemCarousel from "./Carousel/ItemCarousel";


const HomeHeader = () => {
  return (

    <Carousel>
      <ItemCarousel name={"ENCANTO"} category={"Cartoons Comedy"} styleName={"item-1"} bg={"https://ernoticias.com/wp-content/uploads/2021/08/Screenshot_163-735x400.jpg"}/>
      <ItemCarousel name={"Film 2"} category={"Affff"} styleName={"item-2"} bg={"https://i.ytimg.com/vi/jv07MTOq_pE/maxresdefault.jpg"}/>
      <ItemCarousel name={"Film 3"} category={"ADssss"} styleName={"item-3"} bg = {"https://i.pinimg.com/736x/1f/c9/9a/1fc99a8f239827dd37faa13b94c44f62.jpg"}/>
    </Carousel>


  );
};

export default HomeHeader;
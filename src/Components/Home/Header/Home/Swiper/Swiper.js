import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {NavLink} from "react-router-dom";
import ItemCarousel from "../../Carousel/ItemCarousel";
import SliderItem from "../../../../SliderItems/SliderItem";

const CustomSwiper = (props) => {

    let {data,view,carousel,slider,style,сonditionImg,conditionTitle} = props

    return (
        <>
            <Swiper
                id="main"
                tag="section"
                wrapperTag="ul"
                navigation slidesPerView={view}
                spaceBetween={10}>

                {data?.map(item =>
                    <SwiperSlide  key={item.id} >
                        <NavLink
                            to={`/movie/${item.id}`}
                            className={style} >
                            {carousel && <ItemCarousel
                                name={item.title}
                                category={item.category}
                                bg={item.backdrop_path}
                                id={item.id}></ItemCarousel> }
                            {slider && <SliderItem
                                title={item[conditionTitle]}
                                img={item[сonditionImg]}
                            />}
                        </NavLink>
                    </SwiperSlide>

                )}
            </Swiper>
        </>
    );
};

export default CustomSwiper;


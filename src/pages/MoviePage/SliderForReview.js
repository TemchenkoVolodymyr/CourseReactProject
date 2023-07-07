import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderForReview.scss';
import {useSelector} from "react-redux";


const SliderForReview = ({ reviews }) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {movieReviews, loading} = useSelector(state => state.reviews)

  useEffect(() => {
    console.log(movieReviews);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (  <>
    {windowWidth >= 360 && windowWidth < 768 ?
     <div className={'container'}>

        <Swiper
          id="review"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={2}
          spaceBetween={2}>
          {movieReviews?.map((item, i) => <SwiperSlide key={i} >
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user.userName}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.createdAt}</p>
            </div>
          </SwiperSlide>)}

        </Swiper>
      </div> : <div className={'container'}>

        <Swiper
          id="review"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={2}
          spaceBetween={2}>
          {movieReviews?.map((item, i) => <SwiperSlide key={i}>
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user.userName}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.createdAt}</p>
            </div>
          </SwiperSlide>)}

        </Swiper>
      </div>
    }
    </>
  );
};

export default SliderForReview;
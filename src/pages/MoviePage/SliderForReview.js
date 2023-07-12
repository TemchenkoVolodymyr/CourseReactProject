import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderForReview.scss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';


const SliderForReview = () => {
  const { movieReviews } = useSelector((state) => state.reviews);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
      <div className={'container'}>
        <Swiper
          id="review"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={isMobile ? 1 : 2}
          spaceBetween={2}>
          {movieReviews?.map((item, i) => <SwiperSlide key={i} >
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user.userName}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.createdAt}</p>
            </div>
          </SwiperSlide>)}
        </Swiper>
      </div>

  );
};

export default SliderForReview;
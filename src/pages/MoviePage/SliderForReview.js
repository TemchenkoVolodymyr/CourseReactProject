import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderForReview.scss';


const SliderForReview = (props) => {

  const { reviews } = props;

  return (
    <>
      {reviews ? <div className={'container'}>
        <Swiper
          id="review"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={4}
          spaceBetween={2}>
          {reviews.map((item) => <SwiperSlide>
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.date}</p>

            </div>


          </SwiperSlide>)}

        </Swiper>
      </div> : null}
    </>
  );
};

export default SliderForReview;
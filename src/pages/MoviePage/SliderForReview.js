import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderForReview.scss';
import style from '../../Components/Home/HomeLayout.module.scss';


const SliderForReview = (props) => {

  const { reviews } = props;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
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
          {reviews?.map((item) => <SwiperSlide >
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.date}</p>
            </div>
          </SwiperSlide>)}

        </Swiper>
      </div> : <div className={'container'}>

        <Swiper
          id="review"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={4}
          spaceBetween={2}>
          {reviews?.map((item) => <SwiperSlide >
            <div className={'wrapper__slider-item'}>
              <p className={'name'}>{item.user}</p>
              <p className={'content'}>{item.text}</p>
              <p className={'date'}>{item.date}</p>
            </div>
          </SwiperSlide>)}

        </Swiper>
      </div>
    }
    </>
  );
};

export default SliderForReview;
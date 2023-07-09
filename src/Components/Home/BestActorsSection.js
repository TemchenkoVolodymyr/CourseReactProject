import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import style from './HomeLayout.module.scss';
import SliderItem from '../SliderItems/SliderItem';
import {fetchAPIDataWithOutOptions} from "../../utils/helperFunctions/fetchAPIData";

const BestActorsSection = ({ windowWidth }) => {

  const [bestActors, setBestActors] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const actorsData = await fetchAPIDataWithOutOptions('person/popular')
      setBestActors(actorsData.results)
    }
    fetchData()
  }, [])


  return (
    <>
      <Swiper
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation slidesPerView={ windowWidth >= 360 && windowWidth < 768 ? 3 : 7 }
          spaceBetween={10}>
          {
            bestActors?.map((actor) =>
              <SwiperSlide key={actor.id}>
                <NavLink
                  to={`/person/${actor.name.replace(/\s/g, '-')}`}
                  className={style.swiperSlide}
                  onClick={() => localStorage.setItem('actorId', actor.id)}
                >
                  <SliderItem
                    title={actor.name}
                    img={actor.profile_path}
                    rating={actor.popularity.toFixed(1)}
                    displayAsPercentage={false}
                    canvasShow={false}
                  />
                </NavLink>
              </SwiperSlide>
            )
          }
        </Swiper>

    </>
  );
};

export default BestActorsSection;
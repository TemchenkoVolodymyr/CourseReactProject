import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import style from './ActorPage.module.scss';
import { NavLink } from 'react-router-dom';
import SliderItem from '../../Components/SliderItems/SliderItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import ActorCreditsFilter from '../../Components/ActorCreditsList/ActorCreditsFilter';
import CustomButton from '../../Components/Button/CustomButton';
import {Helmet} from "react-helmet";


const ActorPage = () => {

  const { name } = useParams();
  const [actors, setActors] = useState();
  const actorId = localStorage.getItem('actorId');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=movie_credits, credits`);
        setActors(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchData();
  }, [name, actorId]);


  if (!actors) {
    return <>Loading....</>;
  }

  return (
    <>
      <Helmet>
        <title>{actors.name} | Biography and Movies - MovieMagic</title>
      </Helmet>

      <div className={style.wrapper}>
        <PersonalInfoSection actors={actors}/>
        <div className={style.right}>
          <BiographySection actors={actors} handleReadMoreClick={handleReadMoreClick} isExpanded={isExpanded}/>
          <div>
            <ActorCreditsFilter actors={actors}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorPage;
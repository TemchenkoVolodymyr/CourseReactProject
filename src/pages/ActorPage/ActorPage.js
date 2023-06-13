import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import style from './ActorPage.module.scss'
import {NavLink} from "react-router-dom";
import SliderItem from "../../Components/SliderItems/SliderItem";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import ActorCreditsFilter from "../../Components/ActorCreditsList/ActorCreditsFilter";

const ActorPage = () => {

  const {name} = useParams();
  const [actors, setActors] = useState()
  const actorId = localStorage.getItem('actorId');

  console.log(actors);

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=movie_credits, credits`);
        setActors(data);
      } catch (err) {
        alert('Error');
      }
    }

    fetchData();
  }, [name, actorId]);


  let age;
  if(actors) {
    const birthDate = new Date(actors.birthday);
    const currentDate = new Date();
    age = currentDate.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed = currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());

    if (!isBirthdayPassed) {
      age -= 1;
    }
  }


  if (!actors) {
    return <>Loading....</>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${actors?.profile_path}`}
            alt={actors.name}/>
        </div>
        <div className={style.personalInfo}>
          <h2>Personal Info</h2>
          <div>
            <h3>Known For</h3>
            <p>{actors.known_for_department}</p>
          </div>
          <div>
            <h3>Gender</h3>
            {actors.gender === 2 ? <p>Male</p> : <p>Female</p>}
          </div>
          <div>
            <h3>Birthday</h3>
            <p>{actors.birthday}  ({age} years)</p>
          </div>
          <div>
            <h3>Place of Birth</h3>
            <p>{actors.place_of_birth}</p>
          </div>
          <div>
            <h3>Also Known As</h3>
            {actors.also_known_as.map((name, i) => <p key={i}>{name}</p>)}
          </div>
        </div>
      </div>
      <div className={style.right}>
        <h1>{actors?.name}</h1>
        <div className={style.biography}>
          <p>{actors.biography}</p>
        </div>
        <div className={style.knowFor}>
          <h2>Known For</h2>
          <Swiper
            modules={[Navigation]}
            id="main"
            tag="section"
            wrapperTag="ul"
            navigation
            slidesPerView={6}
            spaceBetween={10}>

            {actors.movie_credits.cast.map(movie =>
              <SwiperSlide key={movie.id}>
                <NavLink to={`/movie/${movie.id}`} className={style.swiperSlide}>
                  <SliderItem
                    img={movie.poster_path}
                    rating={(movie.vote_average * 10).toFixed(1)}
                    displayAsPercentage={true}
                  />
                  <p>{movie.title}</p>
                </NavLink>
              </SwiperSlide>
            )}
          </Swiper>

        </div>

        <div>
          <ActorCreditsFilter actors={actors}/>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
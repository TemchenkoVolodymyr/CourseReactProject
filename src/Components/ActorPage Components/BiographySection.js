import React, { useEffect, useRef, useState } from 'react';
import style from '../../pages/ActorPage/ActorPage.module.scss';
import styles from '../Button/CustomButton.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';


const BiographySection = ({ actors }) => {


  const [isExpanded, setIsExpanded] = useState(false);
  let words = [];
  let displayedWords = [];
  if (actors && actors.biography) {
    words = actors.biography.split(' ');
    displayedWords = isExpanded ? words : words.slice(0, 100);
  }

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <h1>{actors?.name}</h1>
      <div className={style.biography}>
        <p>{displayedWords.join(' ')}</p>
        {words.length > 100 && (
          <Button
            className={styles.link}
            onClick={handleReadMoreClick}>{isExpanded ? 'Read Less' : 'Read More'}</Button>
        )}
      </div>
      <div className={style.knowFor}>
        <h2>Known For</h2>
        <Swiper
          modules={[Navigation]}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation
          slidesPerView={2}
          spaceBetween={10}>

          {actors.movie_credits.cast.map((movie) =>
          movie.poster_path &&
          <SwiperSlide key={movie.id}>
            <NavLink
              to={`/movie/${encodeURIComponent(movie.title.replace(/[\s:]/g, '-').toLowerCase())}`}
              onClick={() => localStorage.setItem('movieId', movie.id)} className={style.swiperSlide}>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path }`} alt={movie.title}/>
              <p className={style.nameOfMovie}>{movie.title}</p>
            </NavLink>
          </SwiperSlide>

          )}
        </Swiper>
      </div>
    </>
  );
};

export default BiographySection;
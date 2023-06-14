import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiCastle, GiDramaMasks, GiGhost, GiPistolGun, GiRainbowStar } from 'react-icons/gi';
import { SiOpenstreetmap } from 'react-icons/si';
import { BsArrowClockwise, BsCameraReelsFill, BsEmojiSmile, BsFilm, BsFire } from 'react-icons/bs';
import { AiOutlineCompass, AiOutlineHome } from 'react-icons/ai';



const Navigations = () => {

  return (
    <>
      <NavLink className={'active'} to="/"><BsFilm size={'30'}/><h1>MovieMagic</h1></NavLink>
      <p>menu</p>
      <NavLink to="/"> <AiOutlineHome size={'24'}/>Home</NavLink>
      <NavLink to="/discovery"><AiOutlineCompass size={'24'}/>Discovery</NavLink>
      <NavLink to="/fresh"><BsArrowClockwise size={'24'}/>Fresh movies</NavLink>
      <NavLink to="/trending"><BsFire size={'24'} />Trending now</NavLink>
      <p>popular genders</p>
      <NavLink to="/genre/action"><GiPistolGun size={'24'}/>Action</NavLink>
      <NavLink to="/genre/adventure"><SiOpenstreetmap size={'24'}/>Adventure</NavLink>
      <NavLink to="/genre/comedy"><BsEmojiSmile size={'24'}/>Comedy</NavLink>
      <NavLink to="/genre/drama"><GiDramaMasks size={'24'}/>Drama</NavLink>
      <NavLink to="/genre/animation"><GiRainbowStar size={'24'}/>Animation</NavLink>
      <NavLink to="/genre/fantasy"><GiCastle size={'24'}/>Fantasy</NavLink>
      <NavLink to="/genre/documentary"><BsCameraReelsFill size={'23'}/>Documentary</NavLink>
      <NavLink to="/genre/horror"><GiGhost size={'24'}/>Horror</NavLink>
    </>
  );
};

export default Navigations;
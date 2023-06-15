import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { Link } from 'react-scroll';
const ScrollButton = () => {
  return (
    <>
      <Link to={'mainContent'} smooth={true} duration={500} >
        <AiOutlineArrowUp size={'80'} className={'topArrow'}></AiOutlineArrowUp>
      </Link>
    </>
  );
};

export default ScrollButton;
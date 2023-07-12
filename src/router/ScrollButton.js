import React, {useEffect, useState} from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && <AiOutlineArrowUp size={'80'} className={'topArrow'} onClick={scrollToTop}/>}
    </>
  );
};

export default ScrollButton;
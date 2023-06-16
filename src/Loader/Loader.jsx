import loader from '../assets/loaderSmall.gif';
import React from 'react';
import style from './Loader.module.scss';


const Loader = () => {
  return (
    <div className={style.container}>
      <img src={loader} alt="spinner"/>
    </div>
  );
};
export default Loader;
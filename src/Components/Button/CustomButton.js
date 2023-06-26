import React from 'react';
import style from './CustomButton.module.scss';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
  const { name, path, callback, value } = props;

  const callbackFn =  () => callback(value) ;
  return (
    <>
      {value ? <NavLink to={path} className={style.link} onClick={callbackFn}>
          {name}</NavLink> :
        <NavLink to={path} className={style.link} onClick={callback}>
          {name}</NavLink>}

    </>
  );
};

export default Button;
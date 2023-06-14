import React from 'react';
import style from './Button.module.scss';
import { NavLink } from 'react-router-dom';

const Button = (props) => {
  const { name,path,callback }  = props;
  return (
    <>
      <NavLink to={path} className={style.link} onClick={callback && callback}>
        {name}</NavLink>
    </>
  );
};

export default Button;
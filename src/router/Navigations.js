import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./Navigations.module.scss"
const Navigations = () => {
  return (
   <>
      <NavLink to="/">Home</NavLink>
      <NavLink to='/discovery'>Discovery</NavLink>
   </>
  );
};

export default Navigations;
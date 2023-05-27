import React from 'react';
import {NavLink} from "react-router-dom";

const Navigations = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to='/discovery'>Discovery</NavLink>
    </div>
  );
};

export default Navigations;
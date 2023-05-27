import React from 'react';
import {useSelector} from "react-redux";

const Header = () => {

 let header = useSelector((store) => store.header)
  return (
   <>
     <h1>{header}</h1>
   </>
  );
};

export default Header;
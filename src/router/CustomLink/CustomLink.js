import React from 'react';
import "./CustomLink.scss"
import {Link,useMatch} from "react-router-dom";
const CustomLink = ({children,to,...props}) => {

  const math = useMatch(to);   // в match мы получаем url элемента на который мы нажали


  return (
   <Link to={to} {...props} className={ math ? "link-active" : "link"} >
     {children}
   </Link>
  );
};

export default CustomLink;
import React from 'react';
import {iconsDefs} from "../../assets/icons/iconsDefs";

export const Icon = (props) => {
  const icon = iconsDefs[props.type];
  if(!icon){
    return null;
  }

  const {className, color, size, ...rest } = props;

  let styles = null;
  if(color && size){
    styles = {fill: color, fontSize: size};
  }

  return (
    <svg
      className={icon.className}
      height={icon.height}
      width={icon.width}
      viewBox={icon.viewBox}
      style={styles}
      {...rest}
    >
      {icon.body}
    </svg>
  );
};
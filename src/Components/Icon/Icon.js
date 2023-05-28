import React from 'react';
import {iconsDefs} from "../../assets/icons/iconsDefs";

export const Icon = (props) => {
  const icon = iconsDefs[props.type];
  if(!icon){
    return null;
  }

  const {className, color, size, ...rest } = props;
  const style = {fill:color, fontSize: size};
  return (
    <svg
      className={icon.className}
      height={icon.height}
      width={icon.width}
      viewBox={icon.viewBox}
      style={style}
      {...rest}
    >
      {icon.body}
    </svg>
  );
};
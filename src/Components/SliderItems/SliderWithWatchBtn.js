import React from 'react';
import { useNavigate } from 'react-router';

const SliderWithWatchBtn = (props) => {

  const navigate = useNavigate();
  const { name, category, id, bg } = props;
  const handleClick = () => {
    navigate(`/${id}`);
  };

  const backgroundStyle = {
    backgroundImage:
      `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)),
           url(https://image.tmdb.org/t/p/original${bg})`
  };

  return (
    <div
      style={backgroundStyle}
    >
      <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <button onClick={handleClick}>Watch</button>
      </div>
    </div>
  );
};

export default SliderWithWatchBtn;

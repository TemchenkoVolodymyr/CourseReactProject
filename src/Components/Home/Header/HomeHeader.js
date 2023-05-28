import React from 'react';
import style from "./HomeHeader.module.scss"


const HomeHeader = () => {
  return (
    <div className={style.container}>
      <div className={style.main}>
          <h3>ENCANTO</h3>
          <h4>Cartoons Comedy</h4>
          <button>Watch</button>
      </div>
    </div>
  );
};

export default HomeHeader;
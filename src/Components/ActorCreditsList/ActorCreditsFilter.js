import React from 'react';
import style from './ActorCredits.module.scss'
import DropDown from "./DropDown";

const ActorCreditsFilter = ({actors}) => {
  const actingCredits = [];
  const productionCredits = [];
  const directingCredits = [];

  if (actors.movie_credits.crew) {
    actors.movie_credits.crew.forEach((credit) => {
      switch (credit.department) {
        case 'Acting':
          actingCredits.push(credit);
          break;
        case 'Production':
          productionCredits.push(credit.title);
          break;
        case 'Directing':
          directingCredits.push(credit);
          break;
        default:
          break;
      }
    });
  }
  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <DropDown/>
      </div>


    </div>

  );
};

export default ActorCreditsFilter;
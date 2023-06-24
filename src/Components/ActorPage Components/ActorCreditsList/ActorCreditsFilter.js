import React, {useEffect, useState} from 'react';
import style from './ActorCredits.module.scss';
import DropDown from './DropDown';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchActorCredits} from "../../../utils/helperFunctions/fetchActorCredits";

const ActorCreditsFilter = ({actors}) => {
  const dispatch = useDispatch()
  const {
    actingCredits,
    productionCredits,
    directingCredits,
    writingCredits,
    creatorCredits,
    crewCredits,
    selectedDepartment
  } = useSelector(state => state.credits)

  useEffect(() => {
    fetchActorCredits(actors, dispatch);
  }, [actors, dispatch]);

  let displayCredits;

  switch (selectedDepartment) {
    case 'Acting':
      displayCredits = [...actingCredits];
      break;
    case 'Production':
      displayCredits = [...productionCredits];
      break;
    case 'Directing':
      displayCredits = [...directingCredits];
      break;
    case 'Writing':
      displayCredits = [...writingCredits];
      break;
    case 'Creator':
      displayCredits = [...creatorCredits];
      break;
    case 'Crew':
      displayCredits = [...crewCredits];
      break;
    default:
      displayCredits = [];
      break;
  }

  displayCredits.sort((a, b) => b.year - a.year);

  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <h2>{selectedDepartment}</h2>
        <DropDown
          actingCredits={actingCredits}
          productionCredits={productionCredits}
          directingCredits={directingCredits}
          writingCredits={writingCredits}
          creatorCredits={creatorCredits}
          crewCredits={crewCredits}
        />
      </div>
      {displayCredits.map((credit, index) => (
        <div
          key={index}
          className={style.info}>
          <p>{credit.year} </p>
          <div>
            <NavLink
              to={`/movie/${encodeURIComponent(credit.title.replace(/[\s:]/g, '-').toLowerCase())}`}
              onClick={() => localStorage.setItem('movieId', credit.id )}>
              <h3 className={style.title}>{credit.title}</h3>
            </NavLink>
            <p className={style.role}>as {credit.role}</p>
          </div>
        </div>
      ))}
    </div>

  );
};

export default ActorCreditsFilter;
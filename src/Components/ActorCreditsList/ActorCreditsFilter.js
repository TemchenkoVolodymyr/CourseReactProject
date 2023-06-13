import React, {useState} from 'react';
import style from './ActorCredits.module.scss'
import DropDown from "./DropDown";
import {NavLink} from "react-router-dom";

const ActorCreditsFilter = ({actors}) => {
  const [selectedDepartment, setSelectedDepartment] = useState('Acting');

  const actingCredits = [];
  const productionCredits = [];
  const directingCredits = [];
  const writingCredits = [];
  const creatorCredits = [];
  const crewCredits = [];

  if (actors.movie_credits.cast) {
    actors.movie_credits.cast.forEach((credit) => {
      actingCredits.push({
        title: credit.title,
        year: credit.release_date.slice(0, 4),
        role: credit.character,
        id: credit.id
      })

    });
  }

  if (actors.movie_credits.crew) {
    actors.movie_credits.crew.forEach((credit) => {
      switch (credit.department) {
        case 'Production':
          productionCredits.push({
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.job,
            id: credit.id
          });
          break;
        case 'Directing':
          directingCredits.push({
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.job,
            id: credit.id
          });
          break;
        case 'Writing':
          writingCredits.push({
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.job,
            id: credit.id
          });
          break;
        case 'Creator':
          creatorCredits.push({
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.job,
            id: credit.id
          });
          break;
        case 'Crew':
          crewCredits.push({
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.job,
            id: credit.id
          });
          break;

        default:
          break;
      }
    });
  }

  let displayCredits;
  switch (selectedDepartment) {
    case 'Acting':
      displayCredits = actingCredits;
      break;
    case 'Production':
      displayCredits = productionCredits;
      break;
    case 'Directing':
      displayCredits = directingCredits;
      break;
    case 'Writing':
      displayCredits = writingCredits;
      break;
    case 'Creator':
      displayCredits = creatorCredits;
      break;
    case 'Crew':
      displayCredits = crewCredits;
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
          setSelectedDepartment={setSelectedDepartment}
          actingCredits={actingCredits}
          productionCredits={productionCredits}
          directingCredits={directingCredits}
          writingCredits={writingCredits}
          creatorCredits={creatorCredits}
          crewCredits={crewCredits}
        />
      </div>

        {displayCredits.map((credit) => (
          <div
            key={credit.id}
            className={style.info}>
            <p>{credit.year} </p>
            <div>
              <NavLink to={`/movie/${credit.id}`} >
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
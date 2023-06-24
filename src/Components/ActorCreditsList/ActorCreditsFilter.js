import React, {useEffect, useState} from 'react';
import style from './ActorCredits.module.scss';
import DropDown from './DropDown';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
  addActingCredits, addCreatorCreditsCredits, addCrewCreditsCredits,
  addDirectingCredits,
  addProductionCredits,
  addWritingCredits
} from "../../redux/slices/actorCreditsSlice";


const ActorCreditsFilter = ({ actors }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('Acting');

  const actingCredits = []
  const {
    productionCredits,
    directingCredits,
    writingCredits,
    creatorCredits,
    crewCredits
  } = useSelector(state => state.credits)


  const dispatch = useDispatch()

  if (actors.movie_credits.cast) {
    actors.movie_credits.cast.forEach((credit) => {
      actingCredits.push({
        title: credit.title,
        year: credit.release_date.slice(0, 4),
        role: credit.job,
        id: credit.id
      });

    });
  }
  useEffect(() => {
  if (actors.movie_credits.crew) {
    actors.movie_credits.crew.forEach((credit) => {

      switch (credit.department) {
        case 'Production':
          dispatch(
            addProductionCredits([{
              title: credit.title,
              year: credit.release_date.slice(0, 4),
              role: credit.job,
              id: credit.id
            }])
          )
          break;
        case 'Directing':
          dispatch(
            addDirectingCredits([{
              title: credit.title,
              year: credit.release_date.slice(0, 4),
              role: credit.job,
              id: credit.id
            }])
          )
          break;
        case 'Writing':
          dispatch(
            addWritingCredits([{
              title: credit.title,
              year: credit.release_date.slice(0, 4),
              role: credit.job,
              id: credit.id
            }])
          )
          break;
        case 'Creator':
          dispatch(
            addCreatorCreditsCredits([{
              title: credit.title,
              year: credit.release_date.slice(0, 4),
              role: credit.job,
              id: credit.id
            }])
          )
          break;
        case 'Crew':
          dispatch(
            addCrewCreditsCredits([{
              title: credit.title,
              year: credit.release_date.slice(0, 4),
              role: credit.job,
              id: credit.id
            }])
          )
          break;

        default:
          break;
      }
    });
  }
  }, [actors.movie_credits.crew, dispatch]);
  console.log(productionCredits);
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
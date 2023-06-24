import {
  addActingCredits, addCreatorCreditsCredits, addCrewCreditsCredits,
  addDirectingCredits,
  addProductionCredits,
  addWritingCredits, clearCredits
} from '../../redux/slices/actorCreditsSlice';

export const fetchActorCredits = (actors, dispatch) => {
  dispatch(clearCredits());
  try{
    if (actors.movie_credits.cast) {
      for (const credit of actors.movie_credits.cast) {
        dispatch(
          addActingCredits([{
            title: credit.title,
            year: credit.release_date.slice(0, 4),
            role: credit.character,
            id: credit.id
          }])
        );
      }
    }
    if (actors.movie_credits.crew) {
      for (const credit of actors.movie_credits.crew) {
        switch (credit.department) {
          case 'Production':
           dispatch(
              addProductionCredits([{
                title: credit.title,
                year: credit.release_date.slice(0, 4),
                role: credit.job,
                id: credit.id
              }])
            );
            break;
          case 'Directing':
            dispatch(
              addDirectingCredits([{
                title: credit.title,
                year: credit.release_date.slice(0, 4),
                role: credit.job,
                id: credit.id
              }])
            );
            break;
          case 'Writing':
            dispatch(
              addWritingCredits([{
                title: credit.title,
                year: credit.release_date.slice(0, 4),
                role: credit.job,
                id: credit.id
              }])
            );
            break;
          case 'Creator':
            dispatch(
              addCreatorCreditsCredits([{
                title: credit.title,
                year: credit.release_date.slice(0, 4),
                role: credit.job,
                id: credit.id
              }])
            );
            break;
          case 'Crew':
            dispatch(
              addCrewCreditsCredits([{
                title: credit.title,
                year: credit.release_date.slice(0, 4),
                role: credit.job,
                id: credit.id
              }])
            );
            break;
          default:
            break;
        }
      }
    }
  } catch(error) {
    console.error(error);
  }
}
import {initialStore} from "../../../../redux/initialState";


export const reducerBestActors = (actors = initialStore.bestActors,action) => {
  switch (action.type) {

    default:return actors
  }
}
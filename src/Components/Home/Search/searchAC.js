import {SET_FOUND_MOVIE} from "./SearchReducer";


export const searchAC = (foundMovie) => {
  return{
    type:SET_FOUND_MOVIE,
    movie:foundMovie
  }
}
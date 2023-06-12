import {SET_FOUND_MOVIE} from "./SearchReducer";


export const searchAC = (text) => {
  return {
    type: SET_FOUND_MOVIE,
    movie: text
  }
}
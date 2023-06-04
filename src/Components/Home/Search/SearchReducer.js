import {initialStore} from "../../../redux/initialState";
 export const SET_FOUND_MOVIE = "SET_FOUND_MOVIE "

export const searchReducer = (foundMovie = initialStore.searchMovie,action) => {
  switch (action.type) {
    case SET_FOUND_MOVIE :
      return   action.movie

    default : return foundMovie
  }
}


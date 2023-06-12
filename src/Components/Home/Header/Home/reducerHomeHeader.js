import {initialStore} from "../../../../redux/initialState";

export const reducerHomeHeader = (headerCarouselMovies = initialStore.headerMovies,action) => {
  switch (action.type) {

    default:return headerCarouselMovies
  }
}
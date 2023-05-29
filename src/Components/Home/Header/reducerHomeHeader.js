import {initialStore} from "../../../redux/initialState";

export const reducerHomeHeader = (headerCarouselMovies = initialStore.headerHomeMovies,action) => {
  switch (action.type) {

    default:return headerCarouselMovies
  }
}
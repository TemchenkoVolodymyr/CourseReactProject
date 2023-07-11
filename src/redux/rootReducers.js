import {combineReducers} from 'redux';
import actors from './slices/actorsSlice';
import users from './backend/userBackendSlice'
import favorites from './backend/favoriteBackendSLice';
import ratings from './backend/ratingBackendSlice'
import watchList from './backend/watchListBackEndSlice'
import reviews from './backend/reviewBackendSlice';
import popMovies from './slices/popMoviesSlice';
import search from './slices/searchSlice';
import filters from './slices/filtersSlice';


export default combineReducers({
    favorites,
    ratings,
    filters,
    reviews,
    actors,
    users,
    watchList,
    popMovies,
    search

  },
);

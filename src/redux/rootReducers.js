import {combineReducers} from 'redux';
import actors from './slices/actorsSlice';
import userLists from './slices/userListsSlice';
import users from './backend/userBackendSlice'
import favorites from './backend/favoriteBackendSLice';
import ratings from './backend/ratingBackendSlice'
import watchList from './backend/watchListBackEndSlice'
import reviews from './backend/reviewBackendSlice';
import popMovies from './slices/popMoviesSlice';
import search from './slices/searchSlice';
import {loaderReducer} from '../Loader/LoaderReducer';
import filters from './slices/filtersSlice';


export default combineReducers({
    favorites,
    ratings,
    loading: loaderReducer,
    filters,
    reviews,
    actors,
    userLists,
    users,
    watchList,
    popMovies,
    search

  },
);

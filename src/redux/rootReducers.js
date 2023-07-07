import {combineReducers} from 'redux';
import movies from './slices/movieSlice';
import reviews from './backend/reviewBackendSlice';
import credits from './slices/actorCreditsSlice';
import userReviews from './slices/userReviewsSlice';
import userLists from './slices/userListsSlice';
import users from './backend/userBackendSlice'
import favorites from './backend/favoriteBackendSLice';
import ratings from './backend/ratingBackendSlice'
import watchList from './backend/watchListBackEndSlice'
import {searchReducer} from '../Components/Search/SearchReducer';
import {authReducer} from '../Components/Auth/AuthReducer';
import {loaderReducer} from '../Loader/LoaderReducer';
import filters from './slices/filtersSlice';


export default combineReducers({
    isAuth: authReducer,
    movies,
    searchMovie: searchReducer,
    favorites,
    ratings,
    loading: loaderReducer,
    filters,
    reviews,
    credits,
    userReviews,
    userLists,
    users,
    watchList

  },
);

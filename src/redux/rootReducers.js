import {combineReducers} from 'redux';
import user from './slices/userSlice';
import movies from './slices/movieSlice';
import favorites from './backend/favoriteBackendSLice';
import watchList from './slices/watchListSlice';
import reviews from './slices/reviewsSlice';
import credits from './slices/actorCreditsSlice';
import userReviews from './slices/userReviewsSlice';
import userLists from './slices/userListsSlice';
import users from './backend/userBackendSlice'
import ratings from './backend/ratingBackendSlice'
import {searchReducer} from '../Components/Search/SearchReducer';
import {authReducer} from '../Components/Auth/AuthReducer';
import {loaderReducer} from '../Loader/LoaderReducer';
import filters from './slices/filtersSlice';


export default combineReducers({
    user,
    isAuth: authReducer,
    movies,
    searchMovie: searchReducer,
    favorites,
    watchList,
    ratings,
    loading: loaderReducer,
    filters,
    reviews,
    credits,
    userReviews,
    userLists,
    users,

  },
);

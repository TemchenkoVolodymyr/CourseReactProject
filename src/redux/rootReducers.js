import { combineReducers } from 'redux';
import user from './slices/userSlice';
import movies from './slices/movieSlice';
import favorites from './slices/favoriteSlice';
import watchList from './slices/watchListSlice';
import ratings from './slices/userRatingsSlice';
import reviews from './slices/reviewsSlice';
import credits from './slices/actorCreditsSlice';
import userReviews from './slices/userReviewsSlice';
import { searchReducer } from '../Components/Search/SearchReducer';
import { authReducer } from '../Components/Auth/AuthReducer';
import { loaderReducer } from '../Loader/LoaderReducer';
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
  userReviews


  },
);

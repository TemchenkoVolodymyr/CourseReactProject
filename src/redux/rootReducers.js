import {combineReducers} from "redux";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import {reducerHomeHeader} from "../Components/Home/Header/reducerHomeHeader";
import user from './slices/userSlice'
import movies from './slices/movieSlice'
import {statisticsReducer} from "../Components/AdminPanel/NavComponents/StatisticsAP/statisticsReducer";
import {usersReducerAp} from "../Components/AdminPanel/NavComponents/UsersAP/usersReducerAP";
import {searchReducer} from "../Components/Home/Search/SearchReducer";


export default combineReducers({
    reduxTestCounter: reduxTestCounterReducer,
    headerMovies: reducerHomeHeader,
    user,
    statistics: statisticsReducer,
    movies,
    usersAp: usersReducerAp,
    searchMovie: searchReducer,
  },
);

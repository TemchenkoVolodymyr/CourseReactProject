import {combineReducers} from "redux";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import user from './slices/userSlice'
import movies from './slices/movieSlice'
import {statisticsReducer} from "../Components/AdminPanel/NavComponents/StatisticsAP/statisticsReducer";
import {usersReducerAp} from "../Components/AdminPanel/NavComponents/UsersAP/usersReducerAP";
import {searchReducer} from "../Components/Search/SearchReducer";


export default combineReducers({
    reduxTestCounter: reduxTestCounterReducer,
    user,
    statistics: statisticsReducer,
    movies,
    usersAp: usersReducerAp,
    searchMovie: searchReducer,
  },
);

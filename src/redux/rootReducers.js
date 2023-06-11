import {combineReducers} from "redux";
import {jsonReducer} from "./json/jsonReducer";
import {reducerHomeHeader} from "../Components/Home/Header/reducerHomeHeader";
import user from './slices/userSlice'
import movies from './slices/movieSlice'
import {authReducer} from "../Components/Auth/login/AuthReducer";
import {statisticsReducer} from "../Components/AdminPanel/NavComponents/AdminPanelStatistics/statisticsReducer";
import {usersReducerAp} from "../Components/AdminPanel/NavComponents/AdminPanelUsers/usersReducerAP";
import {searchReducer} from "../Components/Home/Search/SearchReducer";


export default combineReducers({
    jsonDataMedia: jsonReducer,
    headerMovies: reducerHomeHeader,
    user,
    isAuth: authReducer,
    statistics: statisticsReducer,
    movies,
    usersAp: usersReducerAp,
  searchMovie: searchReducer,
  },
);

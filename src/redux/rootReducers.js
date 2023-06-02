import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import {jsonReducer} from "./json/jsonReducer";
import {reducerHomeHeader} from "../Components/Home/Header/reducerHomeHeader";
// import {reducerBestActors} from "../Components/Home/Header/BestActors/reducerBestActors";
import user from './slices/userSlice'
import movies from './slices/movieSlice'
import {authReducer} from "../Components/Auth/login/AuthReducer";
import {statisticsReducer} from "../Components/AdminPanel/NavComponents/StatisticsAP/statisticsReducer";


export default combineReducers({
    header: headerReducer,
    reduxTestCounter: reduxTestCounterReducer,
    jsonDataMedia: jsonReducer,
    headerMovies: reducerHomeHeader,
    // bestActors: reducerBestActors,
    user,
    isAuth: authReducer,
    statistics: statisticsReducer,
    movies
  },
);

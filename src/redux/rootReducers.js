import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import {jsonReducer} from "./json/jsonReducer";
import {reducerHomeHeader} from "../Components/Home/Header/reducerHomeHeader";
import {reducerBestActors} from "../Components/Home/Header/BestActors/reducerBestActors";
import user from './store/user/userSlice'
import {authReducer} from "../Components/Auth/login/AuthReducer";



export default combineReducers({
    header: headerReducer,
    reduxTestCounter: reduxTestCounterReducer,
    jsonDataMedia: jsonReducer,
    headerMovies: reducerHomeHeader,
    bestActors: reducerBestActors,
    user,


    isAuth:authReducer,
  },
);

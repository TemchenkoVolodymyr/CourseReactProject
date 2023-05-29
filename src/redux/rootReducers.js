import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import {jsonReducer} from "./json/jsonReducer";
import {reducerHomeHeader} from "../Components/Home/Header/reducerHomeHeader";
import {reducerBestActors} from "../Components/Home/Header/BestActors/reducerBestActors";


export default combineReducers({
    header: headerReducer,
    reduxTestCounter: reduxTestCounterReducer,
    jsonDataMedia: jsonReducer,
    headerMovies: reducerHomeHeader,
    bestActors: reducerBestActors,
  },
);

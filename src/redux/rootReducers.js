import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';
import {jsonReducer} from "./json/jsonReducer";


export default combineReducers({
    header: headerReducer,
    reduxTestCounter: reduxTestCounterReducer,
    jsonDataMedia: jsonReducer,
  },
);

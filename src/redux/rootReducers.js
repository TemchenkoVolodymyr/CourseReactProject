import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";
import {reduxTestCounterReducer} from '../Components/reduxTestCounter/reduxTestCounterReducer';


export default combineReducers({
        header: headerReducer,
        reduxTestCounter: reduxTestCounterReducer
    },
);

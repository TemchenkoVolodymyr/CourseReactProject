import {combineReducers} from "redux";
import {headerReducer} from "../Components/Header/headerReducer";


export default combineReducers({
    header: headerReducer,
}

)
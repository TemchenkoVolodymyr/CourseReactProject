import {initialStore} from "../initialState";
import {SET_NEW_JSON_DATA} from "./jsonActions";


export const jsonReducer = (jsonData = initialStore.jsonDataMedia,action) =>{

  switch (action.type) {
    case SET_NEW_JSON_DATA:
    return jsonData = action.newDate

    default : return  jsonData
  }
}
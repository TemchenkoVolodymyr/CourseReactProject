import {initialStore} from "../../../../redux/initialState";


export const statisticsReducer = (statistics = initialStore.statistics, action) => {
  switch (action.type) {

    default:
      return statistics
  }
}
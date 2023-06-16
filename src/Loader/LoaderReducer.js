import { initialStore } from '../redux/initialState';
export const CHANGE_LOAD_STATUS = "CHANGE_LOAD_STATUS"
export const loaderReducer = (isLoader = initialStore.isLoading,action) => {
  switch (action.type) {
    case CHANGE_LOAD_STATUS :
      return isLoader = false;




    default:return isLoader;
  }
};
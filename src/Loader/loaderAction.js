import { CHANGE_LOAD_STATUS } from './LoaderReducer';

export const loaderAction = () => {
  return{
    type:CHANGE_LOAD_STATUS
  };
};
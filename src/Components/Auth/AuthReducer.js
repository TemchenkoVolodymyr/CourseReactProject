import { initialStore } from '../../redux/initialState';


export const authReducer = (isAuth = initialStore.isAuth,action) => {
  switch (action.type) {

    default : return isAuth;
  }
};
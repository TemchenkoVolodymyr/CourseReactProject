import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import { initialStore } from './initialState';
import reducer from './rootReducers';


const store = createStore(reducer, initialStore,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;

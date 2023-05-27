import {applyMiddleware, compose, createStore, Store} from "redux";
import {reducer} from "./rootReducer";
import thunk from "redux-thunk";
import {initialStore} from "../barrel";

const store = createStore(
  reducer,
  initialStore,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

import React from "react";
import classes from "./reduxTestCounter.module.scss"
import {useDispatch, useSelector} from 'react-redux';
import {
    decReduxTestCounterActionCreator,
    incReduxTestCounterActionCreator,
    resetReduxTestCounterActionCreator,
} from "./reduxTestCounterActions";

const ReduxTestCounter = () => {
    const dispatch = useDispatch();
    const count = useSelector((store) => store.reduxTestCounter);

    return (
        <div className={classes.wrapper}>
            <h3>This is component for testing Redux</h3>
            <p>If the counter works — then Redux is working</p>
            <p>Redux Counter: <span>{count}</span></p>

            <div className={classes.buttons}>
                <button onClick={() => {dispatch(incReduxTestCounterActionCreator())}}>Increment Counter</button>
                <button onClick={() => {dispatch(decReduxTestCounterActionCreator())}}>Decrement Counter</button>
                <button onClick={() => {dispatch(resetReduxTestCounterActionCreator())}}>Reset Counter</button>
            </div>
        </div>
    );
};

export default ReduxTestCounter;

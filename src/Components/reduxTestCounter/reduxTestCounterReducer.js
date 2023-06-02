import {initialStore} from '../../redux/initialState';
import {reduxTestCounterActions} from './reduxTestCounterActions';


export const reduxTestCounterReducer = (
    counter = initialStore.reduxTestCounter,
    action
) => {
    switch (action.type) {
        case reduxTestCounterActions.INC: {
            return ++counter
        }

        case reduxTestCounterActions.DEC: {
            return --counter
        }

        case reduxTestCounterActions.RESET: {
            return 0
        }

        default: {
            return counter
        }
    }
}

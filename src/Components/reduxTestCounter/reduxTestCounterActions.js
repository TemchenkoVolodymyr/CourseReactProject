export const reduxTestCounterActions = {
    INC: "INC",
    DEC: "DEC",
    RESET: "RESET",
}

export const incReduxTestCounterActionCreator = () => {
    return {
        type: reduxTestCounterActions.INC,
    }
}

export const decReduxTestCounterActionCreator = () => {
    return {
        type: reduxTestCounterActions.DEC
    }
}

export const resetReduxTestCounterActionCreator = () => {
    return {
        type: reduxTestCounterActions.RESET
    }
}

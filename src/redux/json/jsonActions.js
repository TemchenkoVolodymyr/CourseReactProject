export const SET_NEW_JSON_DATA = "SET_NEW_JSON_DATA "

export const jsonAC = (data) => {

  return {
    type:SET_NEW_JSON_DATA,
    newDate: data
  }
}
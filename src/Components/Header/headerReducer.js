import React from 'react';
import {initialStore} from "../../redux/initialState";

export const headerReducer = (header = initialStore.header,action) => {
  switch (action.type) {

    default : return header
  }
}




import * as tabActionTypes from './tabActions';

const initialState = {
  selectedTab: ""
}

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case tabActionTypes.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payLoad.selectedTab
      }
    default: 
      return state
  }
}

export default tabReducer;
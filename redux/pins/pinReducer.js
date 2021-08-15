import * as PinsActions from './pinActions';

// ========================
// ========================

const initialState = {
  data: []
}

const pinsReducer = (state = initialState, action) => {
  switch(action.type) {
    case PinsActions.SET_DATA: return {
      ...state,
      data: action.payLoad
    }
    default: return state
  }
}

export default pinsReducer;
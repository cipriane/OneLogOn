import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';

// Just an example so you can see what the entire
// store looks like
const initialState = {
  count: 0,
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      return state + 1;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  count: counter,
});

export default rootReducer;

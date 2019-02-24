import { INCREASE, LOGOUT, LOGIN } from 'actions';
import { combineReducers } from 'redux';

// Just an example so you can see what the entire
// store looks like
const initialState = {
  count: 0,
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    default:
      return state;
  }
};

const authenticate = (state = null, action) => {
  switch (action.type) {
    case LOGOUT:
      return null;
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  count: counter,
  jwt: authenticate,
});

export default rootReducer;

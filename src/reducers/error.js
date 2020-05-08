import { SET_ERROR, CLEAR_ERROR } from '../actions/error';

export default function loading (state = null, action) {
  switch (action.type) {
    case SET_ERROR :
      return action.error;
    case CLEAR_ERROR :
      return null;
    default :
      return state
  }
}
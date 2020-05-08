import { SET_REQUESTED_URL, CLEAR_REQUESTED_URL } from '../actions/requestedUrl';

export default function requestedUrl (state = null, action) {
  switch (action.type) {
    case SET_REQUESTED_URL :
      return action.url;
    case CLEAR_REQUESTED_URL :
      return null;
    default :
      return state
  }
}
export const SET_REQUESTED_URL = 'SET_REQUESTED_URL';
export const CLEAR_REQUESTED_URL = 'CLEAR_REQUESTED_URL';

export function setRequestedUrl (url) {
  return {
    type: SET_REQUESTED_URL,
    url,
  }
}

export function clearRequestedUrl () {
  return {
    type: CLEAR_REQUESTED_URL,
  }
}
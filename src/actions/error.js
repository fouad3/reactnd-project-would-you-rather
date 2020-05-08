export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export function setError (error) {
  return {
    type: SET_ERROR,
    error
  }
}

export function clearError () {
  return {
    type: CLEAR_ERROR,
  }
}
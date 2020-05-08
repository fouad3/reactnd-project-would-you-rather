export const RETRIEVE_USERS = 'RETRIEVE_USERS';
export const SET_USERS = 'SET_USERS';

export function setUsers (users) {
  return {
    type: SET_USERS,
    users,
  }
}



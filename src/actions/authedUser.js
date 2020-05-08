import axios from 'axios';
import { showLoading, hideLoading } from './loading';
import { setError, clearError } from './error';
import { getInitialData } from './shared';
import history from '../history';

const formatError = (str) => {
  if (typeof(str) === 'string') {
    return str.replace(/_/g, " ").toLowerCase();
  } else {
    return str;
  }
}

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setAuthedUser (user) {
  return {
    type: SET_AUTHED_USER,
    user
  }
}

export function signUpUser (user) {
  const fd = new FormData();
  fd.append('avatar', user.photo);
  fd.append('username', user.username);
  let authedUser = {};
  return (dispatch) => {
    dispatch(clearError());
    dispatch(showLoading());
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaxcQdahK8g3jDIfyA6CYn_-m3KQcE8xY', {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
    .then(({data})=> {
      authedUser.id = data.localId;
      authedUser.token = data.idToken;
      return axios.post(`https://us-central1-reactnd-would-you-rather.cloudfunctions.net/onRequest/api/update-user-profile/${data.localId}`, 
        fd,
        {
          headers: {
            'Authorization': `Bearer ${data.idToken}`
          }
        })
    })
    .then(()=> {
      dispatch(setAuthedUser(authedUser));
      dispatch(hideLoading());
      dispatch(getInitialData());
    })
    .catch(error => {
      dispatch(hideLoading());
      if (error.response) {
        if (error.response.data.error) {
          dispatch(setError(formatError(error.response.data.error.message)));
        } else {
          if (error.response.data.details) {
            dispatch(setError(formatError(error.response.data.details)));
          } else {
            dispatch(setError(formatError(error.response.data)));
          }
        }
      } else if (error.request) {
        dispatch(setError(formatError(error.request.error.message)));
      } else {
        dispatch(setError(formatError(error.message)));
      }
    });
  }
}

export function signInUser (user) {
  return (dispatch, getState) => {
    dispatch(clearError());
    dispatch(showLoading());
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaxcQdahK8g3jDIfyA6CYn_-m3KQcE8xY', {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
    .then(({data})=> {
      dispatch(setAuthedUser({
        id: data.localId,
        token: data.idToken
      }))
      dispatch(hideLoading());
      dispatch(getInitialData());
      if (getState().requestedUrl) {
        history.push(getState().requestedUrl);
      }
    })
    .catch(error => {
      dispatch(hideLoading());
      if (error.response) {
        if (error.response.data.error) {
          dispatch(setError(formatError(error.response.data.error.message)));
        } else {
          dispatch(setError(formatError(error.response.data)));
        }
      } else if (error.request) {
        dispatch(setError(formatError(error.request.error.message)));
      } else {
        dispatch(setError(formatError(error.message)));
      }
    });
  }
}

export function logoutUser () {
  return {
    type: LOGOUT_USER,
  }
}
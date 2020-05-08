import { setUsers} from './users';
import { setQuestions} from './questions';
import { setError, clearError } from './error';
import axios from 'axios';
import { showLoading, hideLoading } from './loading';
import { logoutUser } from './authedUser';

const formatQuestions = (questions, users, id) => {
  Object.keys(questions).forEach(key => {
    if(users[id].answers[key]) {
      questions[key].answered = true;
    } else {
      questions[key].answered = false;
    }
  })
  return questions;
}

const formatError = (str) => {
    if(typeof(str) === 'string') {
      return str.replace(/_/g, " ").toLowerCase();
    } else {
      return str;
    }
}

export function getInitialData () {
  return (dispatch, getState) => {
    dispatch(clearError());
    dispatch(showLoading());
    const retrieveUsers = axios.get('https://us-central1-reactnd-would-you-rather.cloudfunctions.net/onRequest/api/get-users', {
      headers: {
        'Authorization': `Bearer ${getState().authedUser.token}`
      }
    })
    const retrieveQuestions =  axios.get('https://us-central1-reactnd-would-you-rather.cloudfunctions.net/onRequest/api/get-questions', {
      headers: {
        'Authorization': `Bearer ${getState().authedUser.token}`
      }
    })
    axios.all([retrieveUsers, retrieveQuestions])
      .then(axios.spread(function (users, questions) {
        const formattedQuestions = formatQuestions(questions.data, users.data, getState().authedUser.id);
        dispatch(setUsers(users.data));
        dispatch(setQuestions(formattedQuestions));
        dispatch(hideLoading());
      }))
      .catch(error => {
        dispatch(hideLoading());
        let formatedError = '';
        if (error.response) {
          if (error.response.data.error) {
            formatedError = formatError(error.response.data.error.message);
          } else {
            formatedError = formatError(error.response.data);
          }
        } else if (error.request) {
          formatedError = formatError(error.request.error.message);
        } else {
          formatedError = formatError(error.message);
        }
  
        if (formatedError === 'unauthorized') {
          dispatch(logoutUser());
        } else {
          dispatch(setError(formatedError));
        }
      });
  }
}
  
  


    
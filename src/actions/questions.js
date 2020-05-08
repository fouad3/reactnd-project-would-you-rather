import axios from 'axios';
import { showLoading, hideLoading } from './loading';
import { setError, clearError } from './error';
import history from './../history';
import { logoutUser } from './authedUser';


const formatError = (str) => {
  if (typeof(str) === 'string') {
    return str.replace(/_/g, " ").toLowerCase();
  } else {
    return str;
  }
}

export const ADD_QUESTION = 'ADD_QUESTION';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function saveQuestion (question) {
  return (dispatch, getState) => {
    dispatch(clearError());
    dispatch(showLoading());
    axios.post('https://us-central1-reactnd-would-you-rather.cloudfunctions.net/onRequest/api/save-question', {
      question: question
    }, {
        headers: {
          'Authorization': `Bearer ${getState().authedUser.token}`
        }
    })
    .then(({data})=> {
      const newQuestion = data;
      newQuestion.answered = false;
      dispatch(hideLoading());
      dispatch(addQuestion(newQuestion));
      history.push('/');
    })
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

export function saveQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {
    dispatch(clearError());
    dispatch(showLoading());
    axios.post('https://us-central1-reactnd-would-you-rather.cloudfunctions.net/onRequest/api/save-question-answer', {
      qid,
      answer,
      authedUserId: getState().authedUser.id
    }, {
      headers: {
        'Authorization': `Bearer ${getState().authedUser.token}`
      }
    })
    .then(()=> {
      dispatch(addQuestionAnswer(qid, answer, getState().authedUser.id));
      dispatch(hideLoading());
    })
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

export function setQuestions (questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  }
}

export function addQuestionAnswer (qid, answer, authedUserId) {
  return {
    type: ADD_QUESTION_ANSWER,
    qid,
    answer,
    authedUserId
  }
}

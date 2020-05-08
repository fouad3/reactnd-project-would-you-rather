import { SET_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions';
import {LOGOUT_USER} from '../actions/authedUser';

export default function users (state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUserId])
          },
          answered: true
        }
      }
    case LOGOUT_USER :
      return {};
    default :
      return state
  }
}
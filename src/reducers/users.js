import { SET_USERS } from '../actions/users';
import { LOGOUT_USER } from '../actions/authedUser';
import { ADD_QUESTION_ANSWER } from '../actions/questions';


export default function users (state = {}, action) {
  switch (action.type) {
    case SET_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUserId]: {
          ...state[action.authedUserId],
          answers: {
            ...state[action.authedUserId].answers,
            [action.qid]: action.answer
          }
        }
      }
    case LOGOUT_USER :
      return {};
    default :
      return state
  }
}
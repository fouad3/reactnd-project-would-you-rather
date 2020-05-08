import { createSelector } from 'reselect';

const getUsers = state => state.users;
const getQuestions = state => state.questions;

export const getLeaderBoard = createSelector(
  [getUsers, getQuestions],
  (users, questions) => {
    if (Object.keys(users).length === 0 || Object.keys(questions).length === 0) {
      return [];
    }
        
    return Object.keys(users)
      .map(id => {
        const answeredQuestions = Object.keys(users[id].answers).length;
        const createdQuestions =  Object.keys(questions).filter((qid)=> questions[qid].author === id).length;
        return {
          ...users[id],
          answeredQuestions:  answeredQuestions,
          createdQuestions: createdQuestions,
          total: answeredQuestions + createdQuestions
        }
      })
      .sort((a,b) => b.total - a.total);
  }
)


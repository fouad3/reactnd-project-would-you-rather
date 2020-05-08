import { createSelector } from 'reselect';

const getQuestions = state => state.questions;
const getFilter = state => state.filter;

export const selectQuestions = createSelector(
  [getQuestions,getFilter ],
  (questions, filter) => {
    if(Object.keys(questions).length === 0) {
      return [];
    }
    switch (filter) {
      case 'ANSWERED_QUESTIONS':
        return Object.keys(questions).filter(key => questions[key].answered === true)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
      case 'UNANSWERED_QUESTIONS':
        return Object.keys(questions).filter(key => questions[key].answered === false)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
      default :
        return questions;
    }
  }
)


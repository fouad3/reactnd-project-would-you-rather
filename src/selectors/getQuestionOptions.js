import { createSelector } from 'reselect';

const getQuestion = state => state.question;

export const getQuestionOptions = createSelector(
  [getQuestion],
  question => {
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const options = [];
    const optionOne = {
      id: 'optionOne',
      text: question.optionOne.text,
      votes:  question.optionOne.votes.length,
      pct: (question.optionOne.votes.length / totalVotes).toFixed(2) * 100,
      totalVotes: totalVotes,
    }
    const optionTwo = {
      id: 'optionTwo',
      text: question.optionTwo.text,
      votes:  question.optionTwo.votes.length,
      pct: (question.optionTwo.votes.length / totalVotes).toFixed(2) * 100,
      totalVotes: totalVotes,
    }

    if (optionOne.votes > optionTwo.votes) {
      options.push(optionOne);
      options.push(optionTwo)
    } else {
      options.push(optionTwo);
      options.push(optionOne);
    }
    return options;
  }
)
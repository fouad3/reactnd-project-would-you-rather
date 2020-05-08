import React from 'react';
import { Card, Progress, Label } from 'semantic-ui-react';
import { getQuestionOptions } from '../selectors';

const AnsweredQuestionResults = ({ question, answer }) => {
  const options = getQuestionOptions({question});
  return (
    <Card.Group style={{paddingLeft: 10}}>
      <strong style={{fontSize: 28, paddingBottom: 15, paddingTop: 12}}>Results</strong>
      {
        options.map((option) => {
          return (
            <Card fluid centered key={option.id} style={{ backgroundColor: answer === option.id? '#ffebeb': 'white'}}>
              <Card.Content style={{paddingTop: answer === option.id? 0: ''}}>
                {
                  answer === option.id && (
                    <Label floating color='red' circular>
                      Your vote
                    </Label>
                  )
                }
                <h3 style={{color: answer === option.id? '#db2828': 'black'}}>Would you rather {option.text}?</h3>
                <Progress color='red' percent={option.pct} progress > 
                <strong >{option.votes} out of {option.totalVotes} votes</strong>
                </Progress>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  );
}

export default AnsweredQuestionResults;
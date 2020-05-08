import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import history from './../history';

const Poll = ({ author, question, authedUserAnswer }) => {
  return (
    <Card fluid centered>
      <Card.Content>
        <Card.Header textAlign='left'><h3><span style={{textTransform: 'capitalize'}}>{author.username}</span> asks:</h3></Card.Header>
      </Card.Content>
      <Card.Content textAlign='left'>
        <Grid columns='two' divided>
          <Grid.Row>
            <Grid.Column  width={4}>  
              <Image
                floated='left'
                size='medium'
                circular
                src={author.avatarUrl}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <h4 >Would you rather</h4>
                {
                  question.answered ? (
                    <span style={{color: '#676767'}}>...{authedUserAnswer}...</span>
                  ) : (
                    question.optionOne.votes.length > question.optionTwo.votes.length ? (
                      <span style={{color: '#676767'}}> ...{question.optionOne.text}... </span>
                    ) : (
                      <span style={{color: '#676767'}}> ...{question.optionTwo.text}... </span>
                    )
                  )
                }
              </Grid.Row>
              <Grid.Row style={{marginTop: 20}}>
                <Button basic color='red' fluid onClick={(e) => history.push(`/questions/${question.id}`)}>
                  View Poll
                </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default Poll;
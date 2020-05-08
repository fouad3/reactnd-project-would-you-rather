import React, { Component } from 'react';
import { Grid, Message, Container, Menu, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectQuestions } from '../selectors';
import Poll from './Poll';

class Home extends Component {
  state = { activeItem: 'unansweredQuestions' }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  } 

  render() {
    const { loading, error, answeredQuestionsIds, unansweredQuestionsIds, questions, users, authedUser } = this.props;
    return (
      <Container style={{ marginTop: 30 }}>
        <Grid centered padded stackable>
          {
            error && (
              <Grid.Row>
                <Grid.Column width={9}>
                  <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{ error }</p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            )
          }
          <Grid.Row>
            <Grid.Column width={8}>
              <Menu attached='top' widths={2} size='large' stackable>
                <Menu.Item
                  name='answeredQuestions'
                  content='Answered Questions'
                  active={this.state.activeItem === 'answeredQuestions'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='unansweredQuestions'
                  content='Unanswered Questions'
                  active={this.state.activeItem === 'unansweredQuestions'}
                  onClick={this.handleItemClick}
                />
              </Menu>
              {
                this.state.activeItem === 'unansweredQuestions' && (
                  unansweredQuestionsIds.length > 0 ? (
                    <Segment attached='bottom'>
                      {
                        unansweredQuestionsIds.map((id)=> {
                          return (
                            <Poll 
                              key={id} 
                              author={users[questions[id].author]} 
                              question={questions[id]} 
                            />
                          )
                        })
                      }
                    </Segment>
                  ) : (
                    loading ? (
                      <Segment attached='bottom'>
                        <Loader size='medium' active inline='centered' />
                      </Segment>
                    ) : (
                      <Segment attached='bottom'>
                        <p>No Unanswered Questions</p>
                      </Segment>
                    )
                  )
                )
              }
              {
                this.state.activeItem === 'answeredQuestions' && (
                  answeredQuestionsIds.length > 0 ? (
                    <Segment attached='bottom'>
                      {
                        answeredQuestionsIds.map((id)=> {
                          const question = questions[id];
                          const authedUserAnswer = question[authedUser.answers[question.id]].text;
                          return (
                            <Poll 
                              key={id} 
                              author={users[question.author]} 
                              authedUserAnswer = {authedUserAnswer}
                              question={questions[id]} 
                            />
                          )
                        })
                      }
                    </Segment>
                  ) : (
                    loading ? (
                        <Segment attached='bottom'>
                          <Loader size='medium' active inline='centered' />
                        </Segment>
                    ) : (
                      <Segment attached='bottom'>
                        <p>No Answered Questions</p>
                      </Segment>
                    )
                  )
                )
              } 
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps  = ({ loading, error, questions, users, authedUser }) => {
  return {
    loading: loading,
    error: error,
    answeredQuestionsIds: selectQuestions({ questions: questions, filter: 'ANSWERED_QUESTIONS' }),
    unansweredQuestionsIds: selectQuestions({ questions: questions, filter: 'UNANSWERED_QUESTIONS' }),
    questions: questions,
    users: users,
    authedUser: users[authedUser.id]
  }
}

export default connect(mapStateToProps, null)(Home);
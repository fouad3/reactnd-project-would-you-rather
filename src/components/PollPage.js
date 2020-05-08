import React, { Component } from 'react';
import { Grid, Message, Card, Image, Container, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UnansweredQuestionForm from './UnansweredQuestionForm';
import AnsweredQuestionResults from './AnsweredQuestionResults';

class PollPage extends Component {
  render() {
    const { question_id, error, loading, question, author, authedUser } = this.props;

    if (!loading && !question) {
      return <Redirect to='/404'/>;
    }
   
    return (
      <Container style={{ marginTop: 50 }}>
        <Grid centered padded stackable>
          {
            error && (
              <Grid.Row>
                <Grid.Column width={8}>
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
              {
                loading ? (
                  <Loader size='medium' active inline='centered' />
                ) : (
                  <Card fluid centered>
                    <Card.Content>
                      {   
                        question.answered ? (
                          <Card.Header textAlign='left'>
                            <h3>Asked by <span style={{textTransform: 'capitalize'}}>{author.username}</span></h3>
                          </Card.Header>
                        ) :  (
                          <Card.Header textAlign='left'>
                            <h3>
                              <span style={{textTransform: 'capitalize'}}>{author.username}</span> asks:
                            </h3>
                          </Card.Header>
                        )
                      }
                    </Card.Content>
            
                    <Card.Content textAlign='left'>
                      <Grid columns='two' divided padded>
                        <Grid.Row>
                          <Grid.Column  width={5} verticalAlign='middle'>  
                            <Image
                              floated='left'
                              circular
                              src={author.avatarUrl}
                            />
                          </Grid.Column>
                          
                          <Grid.Column width={11}>
                            <Grid.Row>
                              {   
                                question.answered ? (
                                  <AnsweredQuestionResults question={question} answer={authedUser.answers[question_id]}/>
                                ) : (
                                  <UnansweredQuestionForm question={question}/>
                                )
                              }
                            </Grid.Row>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Content>
                  </Card>
                )
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps  = ({ loading, error, questions, users, authedUser }, props) => {
  const { question_id } = props.match.params;

  return {
    question_id,
    error,
    loading,
    question: questions[question_id],
    author: questions[question_id] ? users[questions[question_id].author] : null,
    authedUser: users[authedUser.id]
  }
}

export default connect(mapStateToProps, null)(PollPage);
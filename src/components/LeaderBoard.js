import React, { Component } from 'react';
import { Grid, Message, Container, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLeaderBoard } from '../selectors';
import LeaderBoardList from './LeaderBoardList';

class LeaderBoard extends Component {
  state = { activeItem: 'answeredQuestions'}
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  } 

  render() {
    const { loading, error, leaderBoard } = this.props;
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
            <Grid.Column width={9}>
              {
                loading ? (
                  <Loader size='medium' active inline='centered' />
                ) : (
                  <LeaderBoardList leaderBoard={leaderBoard} />
                )
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps  = ({ loading, error, questions, users }) => {
  return {
    loading: loading,
    error: error,
    leaderBoard: getLeaderBoard({ questions: questions, users: users }),
  }
}

export default connect(mapStateToProps, null)(LeaderBoard);
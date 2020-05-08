import React, { Component } from 'react';
import { Grid, Message, Card, Button, Form, Divider, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewQuestion extends Component {
  state= {
    optionOne: '',
    optionTwo: '',
    disabled: true
  }

  handleChange = (e) => {
    let values = {};
    values[e.target.name] = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      ...values,
    }), ()=> {
      this.setState({
        disabled: this.isDisabled()
      })
    });
  }

  isDisabled = () => {
    if (this.state.optionOne && this.state.optionTwo) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      author: this.props.authedId,
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo
    }
    this.props.onSaveQuestion(newQuestion);
  }

  render() {
    const { loading, error } = this.props;
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
              <Card fluid color='red'>
                <Card.Header textAlign='center'><h2>Create New Question</h2></Card.Header>
                <Card.Content textAlign='left'>
                  <Grid padded>
                    <Grid.Row style={{ paddingTop: 0 }}>
                      <p style={{ fontSize: 15 }}>Complete the question:</p>
                    </Grid.Row>
                    <Grid.Row>
                      <strong style={{ fontSize: 22}}>Would you rather ...</strong>
                    </Grid.Row>
                  </Grid>
                  <Form onSubmit={this.onSubmit} widths='equal'>
                    <Form.Input
                      name='optionOne'
                      placeholder='Enter Option One Text Here'
                      value={this.state.optionOne}
                      onChange = {this.handleChange}
                    />
                    <Divider horizontal>
                      <strong style={{ fontSize: 16 }}>or</strong>
                    </Divider>
                    <Form.Input
                      name='optionTwo'
                      placeholder='Enter Option Two Text Here'
                      value={this.state.optionTwo}
                      onChange = {this.handleChange}
                    />
                    <Button type='submit'  negative disabled={this.state.disabled || loading} loading={loading && !this.state.disabled} fluid>Submit</Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps  = ({ loading, error, authedUser }) => {
  return {
    authedId: authedUser.id,
    loading,
    error,
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    onSaveQuestion: (question) => dispatch(actions.saveQuestion(question))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
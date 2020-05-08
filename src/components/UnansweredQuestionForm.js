import React, { Component } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UnansweredQuestionForm extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveQuestionAnswer(this.props.question.id, this.state.value);
  }

  render() {
    const { question, loading } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <strong style={{fontSize: 25}}>Would You Rather...</strong>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label={question.optionOne.text}
            value='optionOne'
            checked={this.state.value === 'optionOne'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label={question.optionTwo.text}
            value='optionTwo'
            checked={this.state.value === 'optionTwo'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type='submit' basic color='red' fluid disabled={!this.state.value || loading} loading={loading && this.state.value}>
          Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps  = ({loading}) => {
  return {
    loading
  }
}
   
const mapDispatchToProps = dispatch => {
  return {
    onSaveQuestionAnswer: (qid, answer) => dispatch(actions.saveQuestionAnswer(qid, answer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestionForm);
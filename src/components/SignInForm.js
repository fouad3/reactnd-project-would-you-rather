import React, { Component } from 'react';
import { Form, Container, Card, Grid, Button, Message } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SignInForm extends Component {
  state= {
    email: '',
    password: '',
    errors: {
      email: false,
      password: false,
    },
    disabled: true
  }
  handleChange = (e) => {
    const name = e.target.name;
    let values = {};
    values[e.target.name] = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      ...values,
    }), ()=> {
      this.validate(name);
    });
  }
  validate = (name) => {
    let errors = {};

    if (name === 'email') {
      if (!this.state.email) {
        errors.email = 'Required';
      } else {
        errors.email = false;
      }
    }

    if (name === 'password') {
      if (!this.state.password) {
        errors.password = 'Required';
      } else {
        errors.password = false;
      }
    }

    this.setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors
      },
    }), ()=> {
      this.setState({
        disabled: this.isDisabled()
      })
    });
  }
  isDisabled = () => {
    if (this.state.errors.password || this.state.errors.email) {
      return true;
    }
    if (this.state.password && this.state.email) {
      return false;
    } else {
      return true;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.onSignin(user);
  }
  render() {
    return (
      <Container style={{ marginTop: 50 }}>
        <Grid centered padded stackable>
          {
            this.props.error && (
              <Grid.Row>
                <Grid.Column width={8}>
                  <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{ this.props.error }</p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            )
          }
          <Grid.Row>
            <Grid.Column width={8}>
              <Card fluid color='red'>
                <Card.Header textAlign='center'><h2>Sign In</h2></Card.Header>
                <Card.Content>
                  <Form size='small' widths='equal' onSubmit={this.onSubmit}>
                    <Form.Input
                      required
                      label='Email'
                      name='email'
                      value= {this.state.email}
                      onBlur= {(e) => this.validate(e.target.name)}
                      onChange = {this.handleChange}
                      error= {this.state.errors.email}
                    />
                    <Form.Input
                      required
                      label='Password'
                      name='password'
                      type='password'
                      value= {this.state.password}
                      onBlur= {(e) => this.validate(e.target.name)}
                      onChange = {this.handleChange}
                      error= {this.state.errors.password}
                    />
                    <Grid centered padded>
                      <Grid.Row>
                        <Button type='submit' negative disabled={this.state.disabled || this.props.loading} loading={this.props.loading && !this.state.disabled}>Sign In</Button>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }  
};

const mapStateToProps  = ({ loading, error }) => {
  return {
    loading,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (user) => dispatch(actions.signInUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

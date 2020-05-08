import React, { Component } from 'react';
import { Form, Container, Card, Grid, Image, Input, Button, Message } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SignUpForm extends Component {
  state= {
    username: '',
    email: '',
    password: '',
    file: {
      url: 'https://react.semantic-ui.com/images/wireframe/square-image.png',
    },
    errors: {
      username: false,
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
    const pattern = {
      email: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
      password: new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})(?=.*[!@#$%^&*])")
    }

    if (name === 'username') {
      if (!this.state.username) {
        errors.username = 'Required';
      } else if (this.state.username.length > 12) {
        errors.username = 'Must be 12 characters or less'
      } else {
        errors.username = false;
      }
    }

    if (name === 'email') {
      if (!this.state.email) {
        errors.email = 'Required'
      } else if (!pattern.email.test(this.state.email)) {
        errors.email = 'Invalid email address'
      } else {
        errors.email = false;
      }
    }

    if (name === 'password') {
      if (!this.state.password) {
        errors.password = 'Required';
      } else if (!pattern.password.test(this.state.password)) { 
        errors.password = 'Min. 8 characters with at least one letter, a number and a special character.';
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
  onUpload(e) {
    if (e.target.files[0] && e.target.files[0].size > 0) {
      this.setState({
        file: {
          url: URL.createObjectURL(e.target.files[0]),
          content: e.target.files[0]
        }
      }, ()=> {
        this.setState({
          disabled: this.isDisabled()
        })
      })
    }
  }
  isDisabled = () => {
    if (this.state.errors.username || this.state.errors.password || this.state.errors.email) {
      return true;
    }
    if (this.state.username && this.state.password && this.state.email && this.state.file.content) {
      return false;
    } else {
      return true;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      photo: this.state.file.content,
    }
    this.props.onSignup(newUser);
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
                <Card.Header textAlign='center'><h2>Sign Up</h2></Card.Header>
                <Card.Content>
                  <Form size='small' widths='equal' onSubmit={this.onSubmit}>
                    <Grid centered padded>
                      <Grid.Row>
                        <Form.Field required>
                          <label htmlFor='myInput'><Image src={this.state.file.url} circular size='tiny'/></label>
                          <Input 
                            id='myInput'
                            name='file' 
                            style={{display:'none'}} 
                            type='file' 
                            onChange={ (event) => this.onUpload(event)}
                            accept="image/*"
                          />
                        </Form.Field>
                      </Grid.Row>
                    </Grid>
                    <Form.Input
                      required
                      label='Name'
                      name='username'
                      value= {this.state.username}
                      onBlur= {(e) => this.validate(e.target.name)}
                      onChange = {this.handleChange}
                      error= {this.state.errors.username}
                    />
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
                        <Button type='submit' negative disabled={this.state.disabled || this.props.loading} loading={this.props.loading && !this.state.disabled }>Sign Up</Button>
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
    onSignup: (user) => dispatch(actions.signUpUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

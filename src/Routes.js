import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import history from './history';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import NewQuestion from './components/NewQuestion';
import Home from './components/Home';
import PollPage from './components/PollPage';
import LeaderBoard from './components/LeaderBoard';
import ErrorPage from './components/ErrorPage';

class Routes extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/signin' exact component={SignInForm} />
        <Route path='/signup' exact component={SignUpForm} />
        <Route
          render={({ location }) => {
            if(location.pathname === '/404') {
              this.props.clearRequestedUrl();
            } else {
              this.props.setRequestedUrl(location.pathname);
            }
            return <Redirect
            to={{
              pathname: '/signin',
            }}
          />
          }
          }
        />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path='/add' exact component={NewQuestion} />
          <Route path='/leaderboard' exact component={LeaderBoard} />
          <Route path='/questions/:question_id' exact component={PollPage} />
          <Route path='/404' exact component={ErrorPage} />
          <Route path='/' exact component={Home} />
          <Redirect to='/'/>
        </Switch>
      );
    }
    return (
      <Router history={history}>
        {routes}
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuthenticated: authedUser !== null && authedUser.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRequestedUrl: (url) => dispatch(actions.setRequestedUrl(url)),
    clearRequestedUrl: () => dispatch(actions.clearRequestedUrl())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Routes from '../Routes';
import history from './../history';
import * as actions from '../actions';

class App extends Component {
  constructor(props) {
    super(props); 
    
    // detect route change
    history.listen((location, action) => {
      this.setState({ activeItem: location.pathname });
      this.props.clearError();
    });
  }

  state = { activeItem: history.location.pathname }

  componentDidMount() {
    if ( this.props.isAuthenticated ) {
      this.props.getInitialData();
    }
  }

  handleItemClick = (e, { name }) => {
    if(name === 'home') {
      history.push('/');
    } else {
      history.push(`/${name}`);
    }
  } 

  logout = () => {
    if (!this.props.loading) {
      this.props.onLogout();
    }
  }

  render() {
    let menuItems = (
      <React.Fragment>
        <Menu.Item
        name='signup'
        content='Sign Up'
        active={this.state.activeItem === '/signup'}
        onClick={this.handleItemClick}
        position='right'
        />
        <Menu.Item
          name='signin'
          content='Sign In'
          active={this.state.activeItem === '/signin'}
          onClick={this.handleItemClick}
          position='right'
        />
      </React.Fragment>
    );

    if (this.props.isAuthenticated) {
      menuItems = (
        <React.Fragment>
          {
            this.props.user && (
              <Menu.Item fitted position='right'>
                <span>
                  Hello, {this.props.user.username}
                </span>
                <Image src={this.props.user.avatarUrl} size='mini' circular spaced/>
              </Menu.Item>
            )
          }
          <Menu.Item
            onClick={this.logout}
            content='Logout'
            position='right' />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Menu color='red' inverted widths={5} secondary size='large' stackable>
          <Menu.Item
            name='home'
            content='Home'
            active={this.state.activeItem === '/'}
            onClick={this.handleItemClick}
            position='left'
          />
          <Menu.Item
            name='add'
            content='New Question'
            active={this.state.activeItem === '/add'}
            onClick={this.handleItemClick}
            position='left'
          />
           <Menu.Item
            name='leaderboard'
            content='Leader Board'
            active={this.state.activeItem === '/leaderboard'}
            onClick={this.handleItemClick}
            position='left'
          />
          {menuItems}
        </Menu>
        <Routes />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser, users, loading }) => {
  return {
    isAuthenticated: authedUser !== null && authedUser.token !== null,
    user: authedUser? users[authedUser.id] : null,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(actions.clearError()),
    onLogout: () => dispatch(actions.logoutUser()),
    getInitialData: () => dispatch(actions.getInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
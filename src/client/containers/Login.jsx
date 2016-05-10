import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../components/LoginForm';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLoginClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fetch('/api/user/token', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          this.setState({ error: json.error });
        } else {
          localStorage.setItem('token', json.token);
          browserHistory.push('/');
        }
      });
  }

  render() {
    return (
      <LoginForm
        error={this.state.error}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onLoginClick={this.onLoginClick}
      />
    );
  }
}

export default Login;

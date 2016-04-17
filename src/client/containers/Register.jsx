import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import RegisterForm from '../components/RegisterForm';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onEmailUpdate = this.onEmailUpdate.bind(this);
    this.onPasswordUpdate = this.onPasswordUpdate.bind(this);
  }

  onEmailUpdate(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordUpdate(event) {
    this.setState({ password: event.target.value });
  }

  onRegisterClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.setState({ error: 'Email and password are required' });
    } else {
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
  }

  render() {
    return (
      <RegisterForm
        error={this.state.error}
        onEmailUpdate={this.onEmailUpdate}
        onPasswordUpdate={this.onPasswordUpdate}
        onRegisterClick={this.onRegisterClick}
      />
    );
  }
}

export default Register;

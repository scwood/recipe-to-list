import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import RegisterForm from '../components/RegisterForm';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      error: null,
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onRegisterClick(event) {
    event.preventDefault();
    const { email, name, password } = this.state;
    fetch('/api/user/signUpEmail', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          this.setState({ error: json.error });
        } else {
          localStorage.setItem('token', json.token);
          browserHistory.push('/emailSent');
        }
      });
  }

  render() {
    return (
      <RegisterForm
        error={this.state.error}
        onEmailChange={this.onEmailChange}
        onNameChange={this.onNameChange}
        onPasswordChange={this.onPasswordChange}
        onRegisterClick={this.onRegisterClick}
      />
    );
  }
}

export default Register;

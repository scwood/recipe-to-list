import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

import EmailConfirmedMessage from '../components/EmailConfirmedMessage';

class EmailConfirmed extends Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentWillMount() {
    const { token } = this.props.location.query;
    if (!token) {
      return this.setState({ error: 'Invalid or expired token' });
    }
    return fetch('/api/user', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email: 'asdf' }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          this.setState({ error: json.error });
        }
      });
  }

  render() {
    return <EmailConfirmedMessage error={this.state.error} />;
  }
}

EmailConfirmed.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EmailConfirmed;

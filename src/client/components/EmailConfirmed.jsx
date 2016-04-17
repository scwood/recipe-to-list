import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function EmailConfirmed(props) {
  const { query } = props.location;
  const { token } = query;
  console.log(token);
  return (
    <div>
      <p>Email confirmed <i className="fa fa-check text-success"></i></p>
      <p></p>
      <Link to="/login">Click here to go back to the login page.</Link>
    </div>
  );
}

EmailConfirmed.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EmailConfirmed;

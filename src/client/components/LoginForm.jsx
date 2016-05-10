import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function LoginForm(props) {
  return (
    <form>
      {props.error
        ? <div className="alert alert-danger">{props.error}</div>
        : null
      }
      <fieldset className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          placeholder="Enter your email"
          onChange={props.onEmailChange}
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={props.onPasswordChange}
        />
      </fieldset>
      <p><Link to="/">Forgot your password?</Link></p>
      <button className="btn btn-success btn-block" onClick={props.onLoginClick}>
        Sign in
      </button>
      <hr />
      Need an account? <Link to="/register">Click here to create one.</Link>
    </form>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onLoginClick: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;

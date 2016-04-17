import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function LoginForm({ error, onLoginClick, onEmailUpdate, onPasswordUpdate }) {
  return (
    <form>
      {error ? <div className="alert alert-danger">{error}</div> : null }
      <fieldset className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          placeholder="Enter email"
          onChange={onEmailUpdate}
        />
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={onPasswordUpdate}
        />
      </fieldset>
      <p><Link to="/">Forgot your password?</Link></p>
      <button className="btn btn-success btn-block" onClick={onLoginClick}>
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
  onEmailUpdate: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
};

export default LoginForm;

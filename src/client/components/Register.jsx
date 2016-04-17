import React from 'react';

function Register() {
  return (
    <form>
      <fieldset className="form-group">
        <label>Email</label>
        <input className="form-control" placeholder="Enter your email" />
      </fieldset>
      <fieldset className="form-group">
        <label>Name</label>
        <input className="form-control" placeholder="Enter your name" />
      </fieldset>
      <fieldset className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter a password" />
      </fieldset>
      <button
        className="btn btn-success btn-block"
        onClick={(e) => {
          e.preventDefault();
          console.log('Creating account');
        }}
      >
        Create account
      </button>
    </form>
  );
}

export default Register;

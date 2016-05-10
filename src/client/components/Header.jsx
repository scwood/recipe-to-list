import React, { PropTypes } from 'react';

function Header(props) {
  const { username, onSignOutClick } = props;
  return (
    <div className="header clearfix">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/" style={{ fontWeight: '500' }}>
          Recipe To List <i className="fa fa-shopping-cart"></i>
        </a>
        <div className="nav navbar-nav pull-sm-right pull-xs-left">
          <span className="nav-item nav-link active">Welcome, {username}</span>
          <a className="nav-item nav-link" onClick={onSignOutClick}>
            <i className="fa fa-sign-out"></i> Sign out
          </a>
        </div>
      </nav>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};

export default Header;

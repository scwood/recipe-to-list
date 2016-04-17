import React, { PropTypes } from 'react';

import Header from './Header';

function Root(props) {
  const { left, right } = props;
  const username = 'scwood';
  return (
    <div className="container m-t-2" style={{ maxWidth: 800 }}>
      <Header username={username} onSignOutClick={() => console.log('Signing out')} />
      <hr />
      <div className="row">
        <div className="col-md-6" style={{ borderRight: '1px solid rgba(0,0,0,.1)' }}>
          {left}
        </div>
        <div className="col-md-6">
          {right}
        </div>
      </div>
    </div>
  );
}

Root.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};

export default Root;

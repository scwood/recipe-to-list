import React from 'react';

function UrlForm() {
  return (
    <form>
      <fieldset className="form-group">
        <label>Recipe URL:</label>
        <input className="form-control" placeholder="Enter recipe URL" />
      </fieldset>
      <button className="btn btn-success">Submit</button>
    </form>
  );
}

export default UrlForm;

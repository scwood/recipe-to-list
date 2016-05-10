import React from 'react';
import { browserHistory, Redirect, Route, Router } from 'react-router';

import Auth from '../components/Auth';
import ConfirmRecipe from '../components/ConfirmRecipe';
import EmailConfirmed from '../containers/EmailConfirmed';
import EmailSent from '../components/EmailSent';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Root from '../components/Root';
import ShoppingList from '../components/ShoppingList';
import UrlForm from '../components/UrlForm';

function checkForToken(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace('/login');
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route component={Root} onEnter={checkForToken}>
      <Route path="/" components={{ left: UrlForm, right: ShoppingList }} />
      <Route path="/confirmRecipe" components={{ left: ConfirmRecipe, right: ShoppingList }} />
    </Route>
    <Route component={Auth}>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/emailSent" component={EmailSent} />
      <Route path="/emailConfirmed" component={EmailConfirmed} />
    </Route>
    <Redirect from="*" to="/" />
  </Router>
);

export default routes;

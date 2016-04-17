import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import Auth from '../components/Auth';
import ConfirmRecipe from '../components/ConfirmRecipe';
import EmailConfirmed from '../components/EmailConfirmed';
import EmailSent from '../components/EmailSent';
import Login from '../containers/Login';
import Register from '../components/Register';
import Root from '../components/Root';
import ShoppingList from '../components/ShoppingList';
import UrlForm from '../components/UrlForm';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute components={{ left: UrlForm, right: ShoppingList }} />
      <Route path="confirmRecipe" components={{ left: ConfirmRecipe, right: ShoppingList }} />
    </Route>
    <Route component={Auth}>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/emailSent" component={EmailSent} />
      <Route path="/emailConfirmed" component={EmailConfirmed} />
    </Route>
  </Router>
);

export default routes;

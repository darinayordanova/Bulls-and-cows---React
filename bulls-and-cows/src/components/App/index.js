import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Game from '../Game';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
const App = () => (
  <Router>
    <div className="wrapper">
      <Navigation />
      
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.GAME} component={Game} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
);

export default withAuthentication(App);  
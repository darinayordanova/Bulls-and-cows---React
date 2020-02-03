import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul className="nav">
    <li>
      <Link to={ROUTES.LANDING} className="logo"><img src="/images/logo.svg"/></Link>
    </li>
    <li>
      <Link to={ROUTES.GAME}>Play</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul className="nav">
    <li>
      <Link to={ROUTES.LANDING} className="logo"><img src="/images/logo.svg"/></Link>
    </li>
    <li >
      <Link to={ROUTES.SIGN_IN} className='button-primery'>Sign In</Link>
    </li>
  </ul>
);
    

export default Navigation;
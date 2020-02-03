import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import SignOutButton from '../SignOut';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="inner-wrap">
        <h1>Hello {authUser.username}!</h1>
        <h3>E-mail: {authUser.email}</h3>
        <SignOutButton />
      </div>
    )}
  </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);